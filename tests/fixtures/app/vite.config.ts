import { defineConfig } from 'vite';
import vitePluginInspectConfig from 'vite-plugin-inspect-config';

export default defineConfig({
    plugins: [vitePluginInspectConfig({ enable: true })],
    build: {
        lib: {
            formats: ['es'],
            entry: 'index.js',
        },
    },
});
