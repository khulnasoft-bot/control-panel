import type { Meta, StoryFn } from '@storybook/react-vite';
import { useSelect } from 'downshift';
import { createPortal } from 'react-dom';

import { Dropdown, Menu, MenuItem, useDropdown } from '../dropdown/dropdown';
import { Field, FieldHelperText, FieldLabel } from '../field/field';
import { controls } from '../utils/storybook';
import { SelectToggleButton } from './select';

type Game = {
  name: string;
  released: string;
};

const games: Game[] = [
  { name: 'Pac-man', released: 'May 1980' },
  { name: 'Sonic', released: 'June 1991' },
  { name: 'Tetris', released: 'June 1984' },
  { name: 'Street Fighter', released: 'August 1987' },
  { name: 'Zelda', released: 'February 1886' },
  { name: 'Mario Bros', released: 'June 1983' },
  { name: 'Space Invaders', released: 'July 1998' },
  { name: 'Pong', released: 'November 1972' },
  { name: 'Donkey Kong', released: 'July 1981' },
];

type Args = {
  label: string;
  size: 1 | 2 | 3;
  placeholder: string;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  helperText: string;
};

export default {
  title: 'DesignSystem/Select',
  args: {
    label: 'Favorite game',
    size: 2,
    placeholder: 'Pick a game',
    disabled: false,
    readOnly: false,
    invalid: false,
  },
  argTypes: {
    size: controls.inlineRadio([1, 2, 3]),
    helperText: controls.string(),
  },
} satisfies Meta<Args>;

export const select: StoryFn<Args> = ({
  label,
  size,
  placeholder,
  disabled,
  readOnly,
  invalid,
  helperText,
}) => {
  const select = useSelect({
    items: games,
  });

  const dropdown = useDropdown({
    floating: { open: select.isOpen },
    offset: 8,
    flip: true,
    matchReferenceSize: true,
  });

  return (
    <Field
      label={<FieldLabel {...select.getLabelProps()}>{label}</FieldLabel>}
      helperText={<FieldHelperText invalid={invalid}>{helperText}</FieldHelperText>}
      className="max-w-sm"
    >
      <SelectToggleButton
        select={select}
        dropdown={dropdown}
        size={size}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
      >
        {select.selectedItem?.name}
      </SelectToggleButton>

      {createPortal(
        <Dropdown dropdown={dropdown}>
          <Menu {...select.getMenuProps()}>
            {games.map((game, index) => (
              <MenuItem
                {...select.getItemProps({ item: game, index })}
                key={game.name}
                highlighted={index === select.highlightedIndex}
              >
                <span>{game.name}</span>
                <span className="ml-2 text-dim">{game.released}</span>
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>,
        document.body,
      )}
    </Field>
  );
};
