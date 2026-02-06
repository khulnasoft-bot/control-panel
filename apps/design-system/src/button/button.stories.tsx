import type { Meta, StoryFn } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from './button';

type Args = {
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  loading: boolean;
  disabled: boolean;
};

export default {
  title: 'DesignSystem/Button',
  args: {
    variant: 'solid',
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: controls.inlineRadio(['solid', 'outline', 'ghost']),
    size: controls.inlineRadio([1, 2, 3]),
    color: controls.inlineRadio(['green', 'blue', 'orange', 'red', 'gray']),
  },
} satisfies Meta<Args>;

export const button: StoryFn<Args> = (args) => {
  return <Button {...args}>Click me</Button>;
};
