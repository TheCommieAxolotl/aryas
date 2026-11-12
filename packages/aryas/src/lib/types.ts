import type { GithubRelease } from './providers/github/types.ts';

export type AryasProvider = 'github';

export interface Update<P extends AryasProvider> {
    provider: P;
    version: string;
    publishedAt: Date;
    source: P extends 'github' ? GithubRelease : never;
}

export interface Artifact<P extends AryasProvider> {
    provider: P;
    sourceUrl: string;
    path: string;
    update: Update<P>;
}
