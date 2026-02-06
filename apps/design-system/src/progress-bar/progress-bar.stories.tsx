import type { Meta, StoryFn } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { ProgressBar } from './progress-bar';

type Args = {
  progress: number;
};

export default {
  title: 'DesignSystem/ProgressBar',
  args: {
    progress: 0.42,
  },
  argTypes: {
    progress: controls.number({ min: 0, max: 1, step: 0.01 }),
  },
} satisfies Meta<Args>;

export const progressBar: StoryFn = (args) => {
  return <ProgressBar {...args} className="max-w-sm" />;
};
