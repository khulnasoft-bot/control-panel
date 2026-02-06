import type { Meta, StoryFn } from '@storybook/react-vite';
import {
  AppleIcon,
  BananaIcon,
  CarrotIcon,
  CroissantIcon,
  DnaIcon,
  GuitarIcon,
  ListIcon,
  SearchIcon,
  ShapesIcon,
  TimerIcon,
  UtensilsIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { action } from 'storybook/actions';

import { Dialog } from '../dialog/dialog';
import { controls } from '../utils/storybook';
import { CommandPalette, CommandPaletteComponent, useCommandPalette } from './command-palette';

type Args = {
  open?: boolean;
};

const meta = {
  title: 'DesignSystem/CommandPalette',
  argTypes: {
    open: controls.boolean(),
  },
} satisfies Meta;

export default meta;

export const commandPalette: StoryFn<Args> = (args) => {
  const [open, setOpen] = useState(true);

  const palette = useCommandPalette({
    onSuccess: () => setOpen(false),
    onError: action('onError'),
  });

  useEffect(() => {
    initialize(palette);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={args.open ?? open}
      onClose={() => setOpen(false)}
      onClosed={() => palette.reset()}
      className="h-80 w-full max-w-xl overflow-y-hidden p-0!"
    >
      <CommandPaletteComponent
        palette={palette}
        footer={() => <div className="border-t p-2 text-center text-dim">Footer</div>}
        noResults={() => (
          <div className="flex flex-1 items-center justify-center">
            {`No results for "${palette.input.value}"`}
          </div>
        )}
      />
    </Dialog>
  );
};

function initialize(palette: CommandPalette) {
  palette.setIcon(SearchIcon);
  palette.setPlaceholder('Type a command');

  palette.addItem({
    label: 'Simple command',
    description: 'Just a simple command that does pretty much nothing',
    Icon: CroissantIcon,
    execute: action('simple command'),
  });

  palette.addItem({
    label: 'Async command',
    description: 'This command will take some time to execute',
    Icon: TimerIcon,
    execute: async () => {
      palette.setPlaceholder('Please wait...');
      await new Promise((r) => setTimeout(r, 1000));
      action('async command')();
    },
  });

  palette.addItem({
    label: 'With options',
    description: 'Execute a command with some options',
    Icon: ListIcon,
    hasSubItems: true,
    execute: () => {
      palette.setIcon(ListIcon);
      palette.setPlaceholder('Pick an option');

      palette.addItem({ label: 'Banana', Icon: BananaIcon, execute: action('option 1') });
      palette.addItem({ label: 'Carrot', Icon: CarrotIcon, execute: action('option 2') });
      palette.addItem({ label: 'Apple', Icon: AppleIcon, execute: action('option 3') });

      palette.addItem({
        label: 'Tools',
        Icon: UtensilsIcon,
        hasSubItems: true,
        execute: () => {
          palette.addItem({ label: 'Fork', execute: action('fork') });
          palette.addItem({ label: 'Knife', execute: action('knife') });
          palette.addItem({ label: 'Spoon', execute: action('spoon') });
        },
      });
    },
  });

  const group1 = palette.addGroup({ label: 'My group' });

  group1.addItem({
    label: 'Some command',
    description: 'A simple command, but inside a group',
    Icon: ShapesIcon,
    execute: action('group command 1'),
  });

  group1.addItem({
    label: 'Another command',
    description: 'Yet another command inside that group',
    Icon: DnaIcon,
    hasSubItems: true,
    execute: async () => {
      await new Promise((r) => setTimeout(r, 1000));

      palette.addItem({ label: 'Option 1', execute: action('option 1') });
      palette.addItem({ label: 'Option 2', execute: action('option 2') });
    },
  });

  const group2 = palette.addGroup({ label: 'Rocket sauce' });

  group2.addItem({
    label: 'We rock the casbah',
    description: 'You are the Devil, we are the D!',
    Icon: GuitarIcon,
    execute: async () => {
      await new Promise((r) => setTimeout(r, 1000));
      throw new Error('we are the D '.repeat(10) + '!');
    },
  });
}
