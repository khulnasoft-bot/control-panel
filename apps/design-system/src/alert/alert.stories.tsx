import type { Meta, StoryFn } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Alert, AlertStyle, AlertVariant } from './alert';

type Args = {
  variant: AlertVariant;
  style: AlertStyle;
  title: string;
  description: string;
};

export default {
  title: 'DesignSystem/Alert',
  args: {
    variant: 'info',
    style: 'solid',
    title: 'Title',
    description: 'Description',
  },
  argTypes: {
    variant: controls.inlineRadio(['neutral', 'info', 'warning', 'error']),
    style: controls.inlineRadio(['solid', 'outline']),
  },
} satisfies Meta<Args>;

export const alert: StoryFn<Args> = (args) => {
  return <Alert {...args} className="max-w-lg" />;
};
