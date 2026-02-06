import type { Meta, StoryFn } from '@storybook/react-vite';

import { InlineField } from '../field/field';
import { controls } from '../utils/storybook';
import { Radio } from './radio';

type Args = {
  label: string;
  disabled: boolean;
  checked?: boolean;
};

export default {
  title: 'DesignSystem/Radio',
  args: {
    label: 'Label',
    disabled: false,
  },
  argTypes: {
    checked: controls.boolean(),
  },
} satisfies Meta<Args>;

export const radio: StoryFn<Args> = ({ label, ...props }) => {
  return (
    <InlineField>
      <Radio {...props} />
      <span className="peer-disabled:text-dim">{label}</span>
    </InlineField>
  );
};
