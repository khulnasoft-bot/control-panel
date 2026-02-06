import type { StorybookConfig } from '@storybook/react-vite';

export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@vueless/storybook-dark-mode'],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.plugins ??= [];
    config.plugins = config.plugins.filter((plugin) => (plugin as { name: string }).name !== 'vite:dts');
    config.plugins.push((await import('@tailwindcss/vite')).default());
    return config;
  },
} satisfies StorybookConfig;
