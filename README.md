# vite-plugin-inspect-config [![npm](https://img.shields.io/npm/v/vite-plugin-inspect-config.svg)](https://npmjs.com/package/vite-plugin-inspect-config)

[![Unit Test](https://github.com/tjx666/vite-plugin-inspect-config/actions/workflows/unit-test.yml/badge.svg)](https://github.com/tjx666/vite-plugin-inspect-config/actions/workflows/unit-test.yml)

Inspect vite resolved config with infinite object level

## Installation

```bash
npm i -D vite-plugin-inspect-config
```

## Usage

```ts
// vite.config.ts
import vitePluginInspectConfig from 'vite-plugin-inspect-config';

export default defineConfig({
  plugins: [
    vitePluginInspectConfig({
      enable: true,
    }),
  ],
});
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [YuTengjing](https://github.com/tjx666)
