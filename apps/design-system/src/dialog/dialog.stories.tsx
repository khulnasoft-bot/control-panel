import type { Meta, StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { ComponentPlaceholder } from '../utils/storybook';
import { Dialog, DialogFooter, DialogHeader } from './dialog';

type Args = {
  open: boolean;
  title: string;
  footer: string;
};

export default {
  title: 'DesignSystem/Dialog',
  args: {
    open: true,
    title: 'Title',
    footer: 'Footer',
  },
} satisfies Meta<Args>;

export const dialog: StoryFn<Args> = ({ open, title, footer }) => {
  return (
    <Dialog
      open={open}
      onClose={action('close')}
      onClosed={action('closed')}
      className="col w-full max-w-sm gap-4"
    >
      <DialogHeader title={title} onClose={action('close')} />
      <ComponentPlaceholder />
      <DialogFooter>{footer}</DialogFooter>
    </Dialog>
  );
};
