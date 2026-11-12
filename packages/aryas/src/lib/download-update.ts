import { privateEmitter } from './emitter.ts';
import { downloadUpdate as githubDownloadUpdate } from './providers/github/download-update.ts';
import { runtimeState } from './runtime.ts';
import type { AryasProvider, Artifact, Update } from './types.ts';

/**
 * Downloads the update artifact based on the provided update information and the current runtime state.
 * @template P - The provider type extending AryasProvider.
 * @param {Update<P>} update - The update information to download the artifact for.
 * @returns {Promise<null | Artifact<P>>} - Returns an Artifact object if the download is successful, otherwise returns null.
 * @throws {Error} - Throws an error if the runtime state is not initialized or if the provider is not available.
 */
export const downloadUpdate = async <P extends AryasProvider>(update: Update<P>): Promise<null | Artifact<P>> => {
    const state = runtimeState.getState();

    if (!state) {
        throw new Error('Runtime state is not initialized.');
    }

    let artifact: null | Artifact<P> = null;

    switch (state.provider) {
        case 'github': {
            artifact = (await githubDownloadUpdate(update)) as Artifact<P> | null;
        }
    }

    if (artifact) {
        privateEmitter.emit('artifact-downloaded', artifact);
    }

    return artifact;
};
