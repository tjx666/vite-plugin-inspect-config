import fs from 'node:fs/promises';
import { resolve } from 'node:path';

import { execa } from 'execa';
import { expect, test } from 'vitest';

const testCwd = resolve(__dirname, './fixtures/app');

const stdout = await fs.readFile(resolve(testCwd, 'stdout.txt'), 'utf8');
const exec = async (command: string) => {
    const [cmd, ...args] = command.split(' ');
    const result = await execa(cmd, args, {
        cwd: testCwd,
        preferLocal: true,
        env: { FORCE_COLOR: 'true' },
    });
    return {
        stdout: result.stdout.replaceAll('\r?\n?', '\n'),
    };
};

test('basic test', async () => {
    const result = await exec('vite build -l error -c vite.config.ts');
    // await fs.writeFile(resolve(testCwd, 'stdout.txt'), result.stdout, 'utf8');
    expect(result.stdout).toBe(stdout);
});
