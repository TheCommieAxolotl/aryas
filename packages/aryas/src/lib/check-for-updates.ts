import { privateEmitter } from './emitter.ts';
import { logger } from './logger.ts';
import { checkForUpdates as githubCheckForUpdates } from './providers/github/check-for-updates.ts';
import { runtimeState } from './runtime.ts';
import type { AryasProvider, Update } from './types.ts';

/**
 * Checks for updates based on the current runtime state and provider.
 * @template P - The provider type extending AryasProvider.
 * @returns {Update<P> | null} - Returns an Update object if an update is available, otherwise returns null.
 * @throws {Error} - Throws an error if the runtime state is not initialized or if the provider is not available.
 */
export const checkForUpdates = async <P extends AryasProvider>(): Promise<null | Update<P>> => {
    const state = runtimeState.getState();

    if (process.env.NODE_ENV === 'development') {
        logger.info('Skipping update check in development mode.');
        return null;
    }

    if (!state) {
        throw new Error('Runtime state is not initialized.');
    }

    let update: null | Update<P> = null;

    switch (state.provider) {
        case 'github': {
            update = (await githubCheckForUpdates()) as Update<P> | null;
        }
    }

    if (update) {
        privateEmitter.emit('update-available', update);
    } else {
        privateEmitter.emit('no-update-available');
    }

    return update;
};
