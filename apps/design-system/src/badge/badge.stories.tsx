import type { Meta, StoryFn } from '@storybook/react-vite';

import { controls } from '../utils/storybook';
import { Badge, BadgeColor, BadgeSize } from './badge';

type Args = {
  size: BadgeSize;
  color: BadgeColor;
};

export default {
  title: 'DesignSystem/Badge',
  args: {
    size: 2,
    color: 'green',
  },
  argTypes: {
    size: controls.inlineRadio([1, 2]),
    color: controls.inlineRadio(['red', 'green', 'blue', 'orange', 'gray']),
  },
} satisfies Meta<Args>;

export const badge: StoryFn<Args> = (args) => {
  return <Badge {...args}>children</Badge>;
};
