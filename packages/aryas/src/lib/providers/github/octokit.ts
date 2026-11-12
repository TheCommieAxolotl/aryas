import { Octokit } from '@octokit/rest';

let octokitInstance: Octokit | null = null;

export const getOctokitInstance: (token?: string) => Octokit = (token?: string) => {
    if (octokitInstance) {
        return octokitInstance;
    }

    octokitInstance = new Octokit({
        auth: token,
    });

    return octokitInstance;
};
