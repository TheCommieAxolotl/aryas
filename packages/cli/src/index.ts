#!/usr/bin/env node

import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';

import { Octokit } from '@octokit/rest';
import semver from 'semver';

import { getOrCreateRelease, loadZip, replaceAssets, sha256 } from './github.ts';

interface CliOptions {
    version?: string;
    tagPrefix?: string;
    zipPath?: string;
    notes?: string;
    draft?: boolean;
    prerelease?: boolean;
}

const env = (name: string): string | undefined => {
    const value = process.env[name]?.trim();
    return value ? value : undefined;
};

const bool = (value?: string): boolean | undefined => {
    if (value === undefined || value === '') return undefined;
    return /^(1|true|yes|on)$/i.test(value);
};

const HELP = `Usage: aryas-cli [options]

Publishes a release artifact and its .sha256 checksum to GitHub.
Reads GITHUB_REPO (owner/repo) and GITHUB_TOKEN from the environment.

Options:
  --version <semver>    Release version (e.g. 1.2.3)
  --tag-prefix <prefix> Tag prefix prepended to the version (e.g. "v")
  --zip <path>          Path to the zip artifact
  --notes <text>        Release notes (defaults to "Release <version>")
  --draft               Mark the release as a draft
  --prerelease          Mark the release as a pre-release
  --no-input            Never prompt; fail if a required value is missing
  --help, -h            Show this message

Any missing value is prompted for interactively, unless --no-input is set or
stdin is not a TTY (as in CI). The version also falls back to the tag in
GITHUB_REF_NAME, with the tag prefix stripped.

Environment fallbacks: ARYAS_VERSION, ARYAS_TAG_PREFIX, ARYAS_ZIP,
ARYAS_NOTES, ARYAS_DRAFT, ARYAS_PRERELEASE, ARYAS_TARGET, GITHUB_REPO,
GITHUB_TOKEN, GITHUB_API_URL.
`;

const parseArgs = (argv: string[]): { flags: CliOptions; noInput: boolean } => {
    const flags: CliOptions = {};
    let noInput = false;

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];

        if (arg === '--help' || arg === '-h') {
            console.log(HELP);
            process.exit(0);
        }

        if (arg === '--draft' || arg === '--prerelease' || arg === '--no-input') {
            if (arg === '--draft') flags.draft = true;
            else if (arg === '--prerelease') flags.prerelease = true;
            else noInput = true;
            continue;
        }

        if (arg.startsWith('--')) {
            const key = arg.slice(2);
            const value = argv[i + 1];

            if (value === undefined || value.startsWith('--')) {
                throw new Error(`Missing value for ${arg}.`);
            }

            i++;

            if (key === 'version') flags.version = value;
            else if (key === 'tag-prefix') flags.tagPrefix = value;
            else if (key === 'zip') flags.zipPath = value;
            else if (key === 'notes') flags.notes = value;
            else throw new Error(`Unknown option ${arg}.`);
        } else {
            throw new Error(`Unexpected argument "${arg}".`);
        }
    }

    return { flags, noInput };
};

const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
    if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MiB`;
    return `${(bytes / 1024 ** 3).toFixed(1)} GiB`;
};

const main = async (): Promise<void> => {
    const { flags, noInput: flagNoInput } = parseArgs(process.argv.slice(2));

    const token = env('GITHUB_TOKEN');

    if (!token) {
        throw new Error('GITHUB_TOKEN is not set.');
    }

    const repoEnv = env('GITHUB_REPO');

    if (!repoEnv) {
        throw new Error('GITHUB_REPO is not set (expected owner/repo).');
    }

    const [owner, repo] = repoEnv.split('/');

    if (!owner || !repo) {
        throw new Error(`Invalid GITHUB_REPO "${repoEnv}". Expected "owner/repo".`);
    }

    const tagPrefix = flags.tagPrefix ?? env('ARYAS_TAG_PREFIX') ?? '';
    const refName = env('GITHUB_REF_NAME');
    const versionFromRef = refName?.startsWith(tagPrefix) ? refName.slice(tagPrefix.length) : refName;

    const interactive = !flagNoInput && stdin.isTTY === true;

    let rl: ReturnType<typeof createInterface> | null = null;

    const closePrompt = () => {
        rl?.close();
        rl = null;
    };

    const prompt = async (label: string, fallback?: string): Promise<string> => {
        if (!interactive) {
            if (fallback) return fallback;
            throw new Error(`${label} is required (pass it as an option or run interactively).`);
        }

        rl ??= createInterface({ input: stdin, output: stdout });

        const suffix = fallback === undefined ? '' : ` (default: ${fallback})`;
        const answer = (await rl.question(`${label}${suffix}: `)).trim();

        const value = answer || fallback;

        if (!value) {
            throw new Error(`${label} is required (pass it as an option or run interactively).`);
        }

        return value;
    };

    try {
        const version = flags.version ?? env('ARYAS_VERSION') ?? (await prompt('Version', versionFromRef));

        const zipPath = flags.zipPath ?? env('ARYAS_ZIP') ?? (await prompt('Path to zip artifact'));

        const notes = flags.notes ?? env('ARYAS_NOTES');
        const draft = flags.draft ?? bool(env('ARYAS_DRAFT'));
        const prerelease = flags.prerelease ?? bool(env('ARYAS_PRERELEASE'));

        if (!semver.valid(version)) {
            throw new Error(`"${version}" is not a valid semver version.`);
        }

        const tag = `${tagPrefix}${version}`;
        const zip = await loadZip(zipPath);

        const shaName = `${zip.name}.sha256`;
        const shaData = Buffer.from(`${sha256(zip.data)}  ${zip.name}\n`, 'utf-8');

        const apiUrl = env('GITHUB_API_URL');
        const octokit = new Octokit({ auth: token, ...(apiUrl ? { baseUrl: apiUrl } : {}) });

        console.log(`Publishing ${tag} to ${owner}/${repo}...`);

        const { release, created } = await getOrCreateRelease(octokit, owner, repo, {
            tag,
            version,
            notes,
            draft,
            prerelease,
            target: env('ARYAS_TARGET'),
        });

        console.log(created ? `Created release ${tag}.` : `Tag ${tag} already existed; release updated.`);

        await replaceAssets(octokit, owner, repo, release, [
            { name: zip.name, data: zip.data, contentType: 'application/zip' },
            { name: shaName, data: shaData, contentType: 'text/plain' },
        ]);

        console.log(`Uploaded ${zip.name} (${formatBytes(zip.size)}).`);
        console.log(`Uploaded ${shaName}.`);
        console.log(`Release: ${release.html_url}`);
    } finally {
        closePrompt();
    }
};

try {
    await main();
} catch (error) {
    console.error(`aryas-cli: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
}
