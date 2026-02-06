import type { Meta, StoryFn } from '@storybook/react-vite';

import { InlineField } from '../field/field';
import { controls } from '../utils/storybook';
import { Checkbox } from './checkbox';

type Args = {
  label: string;
  disabled: boolean;
  indeterminate?: boolean;
  checked?: boolean;
};

export default {
  title: 'DesignSystem/Checkbox',
  args: {
    label: 'Label',
    disabled: false,
  },
  argTypes: {
    indeterminate: controls.boolean(),
    checked: controls.boolean(),
  },
} satisfies Meta<Args>;

export const checkbox: StoryFn<Args> = ({ label, ...props }) => {
  return (
    <InlineField>
      <Checkbox {...props} />
      <span className="peer-disabled:text-dim">{label}</span>
    </InlineField>
  );
};
