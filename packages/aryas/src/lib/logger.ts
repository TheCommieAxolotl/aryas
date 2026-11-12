const COLOR_RESET = '\x1b[0m';
const COLOR_BOLD = '\x1b[1m';
const COLOR_INFO = '\x1b[36m';
const COLOR_WARN = '\x1b[33m';
const COLOR_ERROR = '\x1b[31m';

const LEVELS = {
    info: { label: 'info', color: COLOR_INFO },
    warn: { label: 'warn', color: COLOR_WARN },
    error: { label: 'error', color: COLOR_ERROR },
} as const;

export type AryasLogLevel = keyof typeof LEVELS;

const colorsEnabled =
    process.env.NO_COLOR === undefined &&
    (process.stdout?.isTTY === true || process.stderr?.isTTY === true || process.env.FORCE_COLOR !== undefined);

const tag = (level: AryasLogLevel): string => {
    const { label, color } = LEVELS[level];
    return colorsEnabled ? `${COLOR_BOLD}${color}aryas:${label}${COLOR_RESET}` : `aryas:${label}`;
};

let infoEnabled = true;

/** Toggles info-level logging. Warnings and errors are always logged. */
export const setInfoEnabled = (enabled: boolean): void => {
    infoEnabled = enabled;
};

export const logger = {
    info: (...args: unknown[]): void => {
        if (!infoEnabled) return;
        console.log(tag('info'), ...args);
    },

    warn: (...args: unknown[]): void => {
        console.warn(tag('warn'), ...args);
    },

    error: (...args: unknown[]): void => {
        console.error(tag('error'), ...args);
    },
};
