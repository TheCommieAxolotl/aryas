import proc from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import util from 'node:util';

import { logger } from './logger.ts';
import type { Artifact, AryasProvider } from './types.ts';

const execFile = util.promisify(proc.execFile);

/**
 * Verifies the extracted app's code signature. Works for both ad-hoc signed and
 * Developer ID signed apps, so no Apple developer certificate is required. Any
 * valid, intact signature passes; a broken or missing one is rejected.
 */
const verifySignature = async (appPath: string): Promise<void> => {
    try {
        await execFile('codesign', ['--verify', '--deep', '--strict', appPath]);
    } catch {
        throw new Error(`Update at ${appPath} failed code signature verification. Refusing to apply.`);
    }
};

/**
 * Applies the downloaded update artifact by unzipping it and replacing the current application with the new version.
 * @template P - The provider type extending AryasProvider.
 * @param {Artifact<P>} artifact - The downloaded update artifact to apply.
 * @returns {Promise<void>} - A promise that resolves when the update has been applied and the application has exited.
 * @throws {Error} - Throws an error if the unzipping or replacement process fails.
 */
export const quitAndUpdate = async <P extends AryasProvider>(artifact: Artifact<P>): Promise<void> => {
    const updatePath = artifact.path;

    const { app } = await import('electron');

    logger.info(`Applying update ${artifact.update.version}...`);

    let appPath: string;

    try {
        await execFile('unzip', ['-o', updatePath, '-d', tmpdir()]);

        appPath = join(tmpdir(), `${app.getName()}.app`);

        await verifySignature(appPath);
    } catch (error) {
        logger.error('Failed to unzip or verify the update.', error);
        throw error;
    }

    const currentAppPath = app.getPath('exe').split('/Contents/')[0];

    if (!currentAppPath.endsWith('.app')) {
        throw new Error(`Refusing to replace non-".app" path: ${currentAppPath}`);
    }

    // Paths are passed through the environment rather than interpolated into the
    // script, so no shell escaping is involved.
    const replaceCommand = `
while kill -0 "$ARYAS_PID" 2>/dev/null; do
    sleep 0.2
done

rm -rf "$ARYAS_CURRENT_APP_PATH"
mv "$ARYAS_UPDATE_APP_PATH" "$ARYAS_CURRENT_APP_PATH"
open "$ARYAS_CURRENT_APP_PATH"
rm "$ARYAS_UPDATE_ZIP_PATH"
`;

    const bash = proc.spawn('bash', ['-c', replaceCommand], {
        detached: true,
        stdio: 'ignore',
        env: {
            ...process.env,
            ARYAS_PID: String(process.pid),
            ARYAS_CURRENT_APP_PATH: currentAppPath,
            ARYAS_UPDATE_APP_PATH: appPath,
            ARYAS_UPDATE_ZIP_PATH: updatePath,
        },
    });

    bash.unref();

    logger.info('Update applied; restarting app.');
    app.quit();
};
