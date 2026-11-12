import module from 'module';

import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: 'index',
        },
        rolldownOptions: {
            // Everything except Node built-ins is bundled so the built CLI can run
            // straight from a checkout (see .github/actions/publish) with no install.
            external: [...module.builtinModules, ...module.builtinModules.map((m) => `node:${m}`)],
        },
    },
});
