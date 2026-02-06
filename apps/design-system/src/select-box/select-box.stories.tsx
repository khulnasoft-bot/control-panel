import type { Meta, StoryFn } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { SelectBox } from './select-box';

type Args = {
  title: string;
  description: string;
  type: 'checkbox' | 'radio';
  checked: boolean;
  disabled: boolean;
  footer?: string;
};

export default {
  title: 'DesignSystem/SelectBox',
  args: {
    title: 'Title',
    description: 'Description',
    type: 'checkbox',
    checked: false,
  },
  argTypes: {
    disabled: controls.boolean(),
    footer: controls.string(),
  },
} satisfies Meta<Args>;

export const selectBox: StoryFn<Args> = (args) => {
  return <SelectBox {...args} className="max-w-xs" />;
};
