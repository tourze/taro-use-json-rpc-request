import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'zh-CN',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'zh-CN', rightIcon: '🇨🇳', title: '中文' },
          { value: 'en-US', rightIcon: '🇺🇸', title: 'English' },
        ],
      },
    },
  },
};

export default preview;