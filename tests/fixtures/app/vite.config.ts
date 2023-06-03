import { defineConfig } from 'vite';
import vitePluginInspectConfig from 'vite-plugin-inspect-config';

export default defineConfig({
    plugins: [vitePluginInspectConfig({ enable: false })],
    build: {
        lib: {
            formats: ['es'],
            entry: 'index.js',
        },
        rollupOptions: {
            external: ['lodash'],
        },
    },
});
