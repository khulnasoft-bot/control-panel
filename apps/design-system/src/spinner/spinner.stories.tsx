import type { Meta, StoryFn } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Spinner } from './spinner';

type Args = {
  progress?: number;
};

export default {
  title: 'DesignSystem/Spinner',
  argTypes: {
    progress: controls.number({ min: 0, max: 1, step: 0.01 }),
  },
} satisfies Meta<Args>;

export const spinner: StoryFn<Args> = ({ progress }) => {
  return <Spinner progress={progress} className="size-24" />;
};
