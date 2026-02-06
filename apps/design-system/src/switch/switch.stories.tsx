import type { Meta, StoryFn } from '@storybook/react-vite';

import { InlineField } from '../field/field';
import { Switch } from './switch';

type Args = {
  label: string;
  disabled: boolean;
};

export default {
  title: 'DesignSystem/Switch',
  args: {
    label: 'Label',
    disabled: false,
  },
} satisfies Meta<Args>;

export const switchStory: StoryFn<Args> = ({ label, disabled }) => {
  return (
    <InlineField>
      <Switch disabled={disabled} />
      <span className="peer-disabled:text-dim">{label}</span>
    </InlineField>
  );
};

switchStory.storyName = 'Switch';
