import semver from 'semver';

import { runtimeState } from '../../runtime.ts';
import type { Update } from '../../types.ts';
import { getOctokitInstance } from './octokit.ts';

const stripTagPrefix = (tag: string, prefix?: string): string =>
    prefix && tag.startsWith(prefix) ? tag.slice(prefix.length) : tag;

export const checkForUpdates = async (): Promise<null | Update<'github'>> => {
    const state = runtimeState.getState();

    if (!state || state.provider !== 'github') {
        throw new Error('Runtime state is not initialized or provider is not GitHub.');
    }

    const octokit = getOctokitInstance(state.variables.token);

    const [owner, repo] = state.variables.repo.split('/');

    if (!owner || !repo) {
        throw new Error("Invalid GitHub repository format. Expected 'owner/repo'.");
    }

    const { data: releases } = await octokit.rest.repos.listReleases({
        owner,
        repo,
    });

    const tagPrefix = state.variables.tag_prefix;

    const filteredReleases = tagPrefix
        ? releases.filter((release) => release.tag_name.startsWith(tagPrefix))
        : releases;

    const latestRelease = filteredReleases
        .filter((release) => semver.gt(stripTagPrefix(release.tag_name, tagPrefix), state.currentVersion))
        .sort((a, b) =>
            semver.rcompare(stripTagPrefix(a.tag_name, tagPrefix), stripTagPrefix(b.tag_name, tagPrefix))
        )[0];

    if (latestRelease) {
        return {
            provider: 'github',
            publishedAt: new Date(latestRelease.published_at || latestRelease.created_at),
            version: stripTagPrefix(latestRelease.tag_name, tagPrefix),
            source: latestRelease,
        };
    }

    return null;
};
