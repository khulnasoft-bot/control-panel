import type { Meta, StoryFn } from '@storybook/react-vite';

import { ComponentPlaceholder } from '../utils/storybook';
import { Collapse } from './collapse';

type Args = {
  open: boolean;
};

export default {
  title: 'DesignSystem/Collapse',
  args: {
    open: true,
  },
} satisfies Meta<Args>;

export const collapse: StoryFn<Args> = ({ open }) => {
  return (
    <Collapse open={open} className="max-w-sm">
      <ComponentPlaceholder />
    </Collapse>
  );
};
