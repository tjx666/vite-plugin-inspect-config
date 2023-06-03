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

export default function vitePluginInspectConfig(options?: Options): Plugin {
    const name = 'vite-plugin-inspect-config';
    let configStr: string | undefined;
    let configResolved: ConfigResolved | undefined;

    const badge = c.bgYellow(c.bold('Resolved Config:'));
    const printConfig = () => {
        if (configStr === undefined && configResolved) {
            configStr = serializeConfig(configResolved);
        }
        console.info(`${badge}\n${configStr}`);
    };

    const onInput = async (input: string) => {
        if (input === '.') {
            printConfig();
        }
    };

    return {
        name,
        enforce: 'post',
        configureServer(server) {
            process.stdin.on('data', onInput).setEncoding('utf8').resume();
            server.httpServer!.on('close', () => {
                process.stdin.off('data', onInput).pause();
            });
        },
        configResolved(config) {
            configResolved = config;
            if (options?.enable ?? false) {
                printConfig();
            }
        },
    };
}
