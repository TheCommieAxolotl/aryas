import fs from 'node:fs';
import os from 'node:os';
import { join } from 'node:path';

import semver from 'semver';

import { privateEmitter } from './emitter.ts';
import { setInfoEnabled } from './logger.ts';
import type { AryasGithubVariables } from './providers/github/types.ts';
import type { AryasProvider } from './types.ts';

export interface AryasState<P extends AryasProvider> {
    currentVersion: string;
    provider: P;
    variables: P extends 'github' ? AryasGithubVariables : never;
    /** Logging configuration. */
    log?: {
        /** Enable info-level logs. Defaults to true. Warnings and errors are always logged. */
        info?: boolean;
    };
}

export class RuntimeState<P extends AryasProvider> {
    private state: AryasState<P> | null = null;

    init(state: AryasState<P>) {
        this.state = state;
        setInfoEnabled(state.log?.info ?? true);

        void import('electron').then(({ app }) => {
            const versionFilePath = join(os.homedir(), '.aryas-versions');

            const appPathHash = this.hashString(app.getAppPath());

            let versionFileContent = '';

            try {
                versionFileContent = fs.readFileSync(versionFilePath, 'utf-8');
            } catch {
                // File does not exist, will create a new one
            }

            const versionLines = versionFileContent.split('\n').filter(Boolean);
            const oldVersionLine = versionLines.find((line) => line.startsWith(`${appPathHash}=`));
            const updatedLines = versionLines.filter((line) => !line.startsWith(`${appPathHash}=`));

            updatedLines.push(`${appPathHash}=${state.currentVersion}`);

            if (oldVersionLine) {
                const oldVersion = oldVersionLine.split('=')[1];

                if (semver.gt(state.currentVersion, oldVersion)) {
                    privateEmitter.emit('updated', state.currentVersion);
                }
            }

            fs.writeFileSync(versionFilePath, updatedLines.join('\n'), 'utf-8');
        });
    }

    getState(): AryasState<P> | null {
        return this.state;
    }

    private hashString(input: string): string {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString();
    }
}

export const runtimeState = new RuntimeState();
