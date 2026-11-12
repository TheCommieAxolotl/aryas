import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';

import { Octokit } from '@octokit/rest';

export interface LoadedZip {
    data: Buffer;
    name: string;
    size: number;
}

export const loadZip = async (path: string): Promise<LoadedZip> => {
    const data = await readFile(path);
    return { data, name: basename(path), size: data.length };
};

export const sha256 = (data: Buffer): string => createHash('sha256').update(data).digest('hex');

type Release = Awaited<ReturnType<Octokit['rest']['repos']['createRelease']>>['data'];

export interface ReleaseOptions {
    tag: string;
    version: string;
    notes?: string;
    draft?: boolean;
    prerelease?: boolean;
    target?: string;
}

const releaseBody = (options: ReleaseOptions): string =>
    options.notes?.trim() ? options.notes : `Release ${options.version}`;

/**
 * Fetches the release for `tag`, creating it if it does not exist. Existing
 * releases are patched (PATCH) to refresh their name and body.
 */
export const getOrCreateRelease = async (
    octokit: Octokit,
    owner: string,
    repo: string,
    options: ReleaseOptions
): Promise<{ release: Release; created: boolean }> => {
    const { tag } = options;
    const body = releaseBody(options);
    const draft = options.draft;
    const prerelease = options.prerelease;

    const fetch = () => octokit.rest.repos.getReleaseByTag({ owner, repo, tag });

    try {
        const { data } = await fetch();

        const { data: updated } = await octokit.rest.repos.updateRelease({
            owner,
            repo,
            release_id: data.id,
            name: tag,
            body,
            tag_name: tag,
            ...(draft === undefined ? {} : { draft }),
            ...(prerelease === undefined ? {} : { prerelease }),
        });

        return { release: updated as Release, created: false };
    } catch (error) {
        const status = (error as { status?: number }).status;

        if (status !== 404) {
            throw error;
        }
    }

    try {
        const { data } = await octokit.rest.repos.createRelease({
            owner,
            repo,
            tag_name: tag,
            name: tag,
            body,
            draft,
            prerelease,
            target_commitish: options.target,
        });

        return { release: data, created: true };
    } catch (error) {
        // Another job in the matrix may have created the release first.
        if ((error as { status?: number }).status !== 422) {
            throw error;
        }

        const { data } = await fetch();
        return { release: data as Release, created: false };
    }
};

export interface AssetUpload {
    name: string;
    data: Buffer;
    contentType: string;
}

/**
 * Replaces the release's assets: any existing asset with a matching name is
 * deleted first, then the new ones are uploaded.
 */
export const replaceAssets = async (
    octokit: Octokit,
    owner: string,
    repo: string,
    release: { id: number; assets: { id: number; name: string }[] },
    uploads: AssetUpload[]
): Promise<string[]> => {
    const names = new Set(uploads.map((upload) => upload.name));

    for (const asset of release.assets) {
        if (names.has(asset.name)) {
            await octokit.rest.repos.deleteReleaseAsset({ owner, repo, asset_id: asset.id });
        }
    }

    const uploaded: string[] = [];

    for (const { name, data, contentType } of uploads) {
        await octokit.rest.repos.uploadReleaseAsset({
            owner,
            repo,
            release_id: release.id,
            name,
            data: data as unknown as string,
            headers: { 'content-type': contentType },
        });
        uploaded.push(name);
    }

    return uploaded;
};
