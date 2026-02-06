import type { Meta, StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Stepper } from './stepper';

type Args = {
  activeStep: number;
  totalSteps: number;
};

export default {
  title: 'DesignSystem/Stepper',
  args: {
    activeStep: 2,
    totalSteps: 5,
  },
} satisfies Meta<Args>;

export const stepper: StoryFn<Args> = (args) => {
  return <Stepper {...args} onClick={action('click')} />;
};
