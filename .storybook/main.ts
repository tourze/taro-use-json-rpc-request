import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../examples/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    // 配置别名和解析
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // 处理 Taro React 运行时依赖
    config.resolve.alias['@tarojs/react'] = 'react';
    config.resolve.alias['@tarojs/react/jsx-dev-runtime'] = 'react/jsx-dev-runtime';
    config.resolve.alias['@tarojs/react/jsx-runtime'] = 'react/jsx-runtime';

    // 处理其他 Taro 相关依赖
    config.resolve.alias['@tarojs/taro'] = path.resolve(__dirname, '../src/taro-mock.js');
    config.resolve.alias['@tarojs/api'] = path.resolve(__dirname, '../src/taro-mock.js');

    // 优化构建配置
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      'react',
      'react-dom',
      'swr',
      'crypto-js',
      'md5',
      'nanoid',
      'query-string',
      'js-base64'
    ];

    return config;
  },
};

export default config;