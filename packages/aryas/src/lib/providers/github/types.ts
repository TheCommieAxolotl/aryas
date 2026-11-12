import type { Octokit } from '@octokit/rest';
import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';

export type GithubRelease = GetResponseDataTypeFromEndpointMethod<Octokit['rest']['repos']['getReleaseByTag']>;

export interface AryasGithubVariables {
    repo: string;
    token?: string;
    /** Only consider release tags that start with this prefix. */
    tag_prefix?: string;
    /** When true, a checksum asset must exist on the release or the download is refused. */
    requireChecksum?: boolean;
}
