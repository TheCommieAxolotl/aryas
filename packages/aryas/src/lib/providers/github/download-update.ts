import { createHash } from 'node:crypto';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { privateEmitter } from '../../emitter.ts';
import { logger } from '../../logger.ts';
import { runtimeState } from '../../runtime.ts';
import type { Artifact, AryasProvider, Update } from '../../types.ts';
import { getOctokitInstance } from './octokit.ts';
import type { GithubRelease } from './types.ts';

interface Checksum {
    algorithm: 'sha256' | 'sha512';
    hash: string;
}

const getAssetContent = async (
    octokit: ReturnType<typeof getOctokitInstance>,
    owner: string,
    repo: string,
    assetId: number
): Promise<Buffer> => {
    const response = await octokit.rest.repos.getReleaseAsset({
        owner,
        repo,
        asset_id: assetId,
        headers: {
            accept: 'application/octet-stream',
        },
    });

    return Buffer.from(response.data as unknown as ArrayBuffer);
};

const streamAsset = async (
    octokit: ReturnType<typeof getOctokitInstance>,
    owner: string,
    repo: string,
    assetId: number,
    total: number,
    onProgress: (received: number, total: number) => void
): Promise<Buffer> => {
    const response = await octokit.rest.repos.getReleaseAsset({
        owner,
        repo,
        asset_id: assetId,
        headers: {
            accept: 'application/octet-stream',
        },
        request: { parseSuccessResponseBody: false },
    });

    const stream = response.data as unknown as ReadableStream<Uint8Array>;
    const reader = stream.getReader();

    const chunks: Uint8Array[] = [];
    let received = 0;

    try {
        for (;;) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            received += value.byteLength;
            onProgress(received, total);
        }
    } finally {
        reader.releaseLock();
    }

    return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
};

const findChecksumAsset = (release: GithubRelease, zipName: string) => {
    const zipStem = zipName.replace(/\.zip$/i, '');

    const candidates = new Set([
        `${zipName}.sha256`,
        `${zipStem}.sha256`,
        `${zipName}.sha512`,
        `${zipStem}.sha512`,
        'sha256sums.txt',
        'sha512sums.txt',
        'sha256sums',
        'sha512sums',
        'SHA256SUMS',
        'SHA512SUMS',
        'SHA256SUMS.txt',
        'SHA512SUMS.txt',
    ]);

    return release.assets.find((asset) => candidates.has(asset.name) || /^.+\.(sha256|sha512)$/i.test(asset.name));
};

const parseChecksum = (content: string, algorithm: Checksum['algorithm']): string | null => {
    const length = algorithm === 'sha256' ? 64 : 128;
    const hexOnly = new RegExp(`^[0-9a-f]{${length}}$`, 'i');
    const bsd = new RegExp(`sha-?${algorithm.slice(-3)}\\s*\\([^)]*\\)\\s*=\\s*([0-9a-f]+)$`, 'i');

    for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const bsdMatch = trimmed.match(bsd);
        if (bsdMatch && hexOnly.test(bsdMatch[1])) {
            return bsdMatch[1];
        }

        const firstToken = trimmed.split(/\s+/)[0];
        if (hexOnly.test(firstToken)) {
            return firstToken;
        }
    }

    return null;
};

const verifyChecksum = (data: Buffer, checksum: Checksum): boolean =>
    createHash(checksum.algorithm).update(data).digest('hex').toLowerCase() === checksum.hash.toLowerCase();

const resolveChecksum = async (
    octokit: ReturnType<typeof getOctokitInstance>,
    owner: string,
    repo: string,
    release: GithubRelease,
    zipName: string,
    required: boolean
): Promise<null | Checksum> => {
    const checksumAsset = findChecksumAsset(release, zipName);

    if (!checksumAsset) {
        if (required) {
            throw new Error(
                'No checksum asset found on the release; refusing to download without integrity verification.'
            );
        }

        logger.warn('No checksum asset found on the release; the update will not be integrity-verified.');
        return null;
    }

    const content = await getAssetContent(octokit, owner, repo, checksumAsset.id);
    const algorithm: Checksum['algorithm'] = /sha512/i.test(checksumAsset.name) ? 'sha512' : 'sha256';
    const hash = parseChecksum(content.toString('utf-8'), algorithm);

    if (!hash) {
        throw new Error(`Could not parse a ${algorithm} checksum from asset "${checksumAsset.name}".`);
    }

    return { algorithm, hash };
};

export const downloadUpdate = async <P extends AryasProvider>(update: Update<P>): Promise<null | Artifact<P>> => {
    const state = runtimeState.getState();

    if (!state || state.provider !== 'github') {
        throw new Error('Runtime state is not initialized or provider is not GitHub.');
    }

    const [owner, repo] = state.variables.repo.split('/');

    if (!owner || !repo) {
        throw new Error("Invalid GitHub repository format. Expected 'owner/repo'.");
    }

    const asset = update.source.assets.find((asset) => asset.content_type === 'application/zip');

    if (!asset) {
        throw new Error('No suitable asset found for download.');
    }

    const octokit = getOctokitInstance(state.variables.token);
    const expectedChecksum = await resolveChecksum(
        octokit,
        owner,
        repo,
        update.source,
        asset.name,
        state.variables.requireChecksum === true
    );

    const tempFilePath = join(tmpdir(), `${createHash('sha256').update(asset.browser_download_url).digest('hex')}.zip`);

    const makeArtifact = (): Artifact<P> => ({
        provider: state.provider as P,
        sourceUrl: asset.browser_download_url,
        path: tempFilePath,
        update: update,
    });

    // reuse an existing download if it matches the expected size and checksum
    try {
        const fileStats = await stat(tempFilePath);

        if (fileStats.size === asset.size) {
            const existing = await readFile(tempFilePath);

            if (!expectedChecksum || verifyChecksum(existing, expectedChecksum)) {
                logger.info('Reusing previously downloaded update.');
                return makeArtifact();
            }
        }
    } catch {}

    logger.info(`Downloading update ${update.version}...`);

    let lastEmittedPercent = -1;

    const emitProgress = (received: number, total: number): void => {
        const percent = total > 0 ? (received / total) * 100 : 100;
        const wholePercent = Math.floor(percent);

        if (wholePercent === lastEmittedPercent) return;

        lastEmittedPercent = wholePercent;

        privateEmitter.emit('download-progress', {
            version: update.version,
            received,
            total,
            percent: Math.round(percent * 10) / 10,
        });
    };

    const data = await streamAsset(octokit, owner, repo, asset.id, asset.size, emitProgress);

    if (expectedChecksum && !verifyChecksum(data, expectedChecksum)) {
        throw new Error('Downloaded update failed checksum verification. Refusing to apply.');
    }

    if (expectedChecksum) {
        logger.info(`Checksum verified (${expectedChecksum.algorithm}).`);
    }

    await writeFile(tempFilePath, data);

    return makeArtifact();
};
