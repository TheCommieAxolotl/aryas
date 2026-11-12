import { EventEmitter } from 'node:events';

import type { Update, AryasProvider, Artifact } from './types.ts';

export interface DownloadProgress {
    version: string;
    received: number;
    total: number;
    percent: number;
}

export type AryasEventMap = {
    'update-available': [Update<AryasProvider>];
    'artifact-downloaded': [Artifact<AryasProvider>];
    'download-progress': [DownloadProgress];
    'no-update-available': [];
    updated: [string];
    error: [Error];
};

export interface AryasEmitter {
    on(event: 'updated', listener: (version: string) => void): this;
    on(event: 'update-available', listener: (update: Update<AryasProvider>) => void): this;
    on(event: 'artifact-downloaded', listener: (artifact: Artifact<AryasProvider>) => void): this;
    on(event: 'download-progress', listener: (progress: DownloadProgress) => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'no-update-available', listener: () => void): this;

    once(event: 'updated', listener: (version: string) => void): this;
    once(event: 'update-available', listener: (update: Update<AryasProvider>) => void): this;
    once(event: 'artifact-downloaded', listener: (artifact: Artifact<AryasProvider>) => void): this;
    once(event: 'download-progress', listener: (progress: DownloadProgress) => void): this;
    once(event: 'error', listener: (error: Error) => void): this;
    once(event: 'no-update-available', listener: () => void): this;

    off(event: 'updated', listener: (version: string) => void): this;
    off(event: 'update-available', listener: (update: Update<AryasProvider>) => void): this;
    off(event: 'artifact-downloaded', listener: (artifact: Artifact<AryasProvider>) => void): this;
    off(event: 'download-progress', listener: (progress: DownloadProgress) => void): this;
    off(event: 'error', listener: (error: Error) => void): this;
    off(event: 'no-update-available', listener: () => void): this;
}

export const privateEmitter = new EventEmitter<AryasEventMap>();

export const aryasEmitter: AryasEmitter = {
    on(event, listener) {
        privateEmitter.on(event, listener as (...args: any[]) => void);
        return this;
    },

    once(event, listener) {
        privateEmitter.once(event, listener as (...args: any[]) => void);
        return this;
    },

    off(event, listener) {
        privateEmitter.off(event, listener as (...args: any[]) => void);
        return this;
    },
};
