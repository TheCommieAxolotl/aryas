import { type AryasState, runtimeState } from './lib/runtime.ts';
export { aryasEmitter as emitter } from './lib/emitter.ts';
export type { DownloadProgress } from './lib/emitter.ts';
import type { AryasProvider } from './lib/types.ts';
export { checkForUpdates } from './lib/check-for-updates.ts';
export { downloadUpdate } from './lib/download-update.ts';
export { quitAndUpdate } from './lib/apply-update.ts';

/**
 * Initialises the runtime state with the provided configuration.
 * @param state - The configuration state to initialise the runtime with.
 */
export const init = <P extends AryasProvider>(state: AryasState<P>) => {
    runtimeState.init(state);
};
