import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    '@tarojs/taro',
    'react',
    'swr',
    'crypto-js',
    'js-base64',
    'md5',
    'nanoid',
    'query-string'
  ],
  esbuildOptions: (options) => {
    options.target = 'es2020';
    return options;
  },
});