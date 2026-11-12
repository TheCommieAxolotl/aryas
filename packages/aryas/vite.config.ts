import module from 'module';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    // pack: {
    //   dts: {
    //     tsgo: true,
    //   },
    //   exports: true,
    // },
    // lint: {
    //   options: {
    //     typeAware: true,
    //     typeCheck: true,
    //   },
    // },
    // fmt: {},
    plugins: [
        dts({
            exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'vite.config.ts', 'vitest.config.ts'],
        }),
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: 'index',
        },
        rolldownOptions: {
            external: [...module.builtinModules, ...module.builtinModules.map((m) => `node:${m}`), 'electron'],
        },
    },
});
