import { inspect } from 'node:util';

import c from 'picocolors';
import type { Plugin } from 'vite';

type ConfigResolvedHook = Extract<NonNullable<Plugin['configResolved']>, Function>;
type ConfigResolved = Parameters<ConfigResolvedHook>[0];

function serializeConfig(config: ConfigResolved) {
    return inspect(config, {
        depth: Number.POSITIVE_INFINITY,
        colors: true,
    });
}

interface Options {
    enable?: boolean;
}

export default function vitePluginInspectConfig(options?: Options) {
    const name = 'vite-plugin-inspect-config';
    return {
        name,
        enforce: 'post',
        configResolved(config) {
            if (options?.enable ?? false) {
                const badge = c.bgYellow(c.bold('Resolved Config:'));
                console.info(`${badge}\n${serializeConfig(config)}`);
            }
        },
    } satisfies Plugin;
}
