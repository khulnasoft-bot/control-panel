import { useCombobox } from 'downshift';

import { ItemList } from './item-list';
import { SearchInput } from './search-input';
import { CommandPalette } from './use-command-palette';

export { useCommandPalette, type CommandPalette, type CommandPaletteItem } from './use-command-palette';

type CommandPaletteProps = {
  palette: CommandPalette;
  noResults?: () => React.ReactNode;
  footer?: () => React.ReactNode;
};

export function CommandPaletteComponent({ palette, noResults, footer }: CommandPaletteProps) {
  const combobox = useCommandPaletteCombobox(palette);

  return (
    <div className="col h-full">
      <SearchInput palette={palette} combobox={combobox} />
      <ItemList palette={palette} combobox={combobox} noResults={noResults} />
      {footer?.()}
    </div>
  );
}

function useCommandPaletteCombobox(palette: CommandPalette) {
  return useCombobox({
    isOpen: true,
    items: palette.items,
    selectedItem: null,

    itemToString(item) {
      return typeof item?.label === 'string' ? item.label : '';
    },

    highlightedIndex: palette.highlightedIndex,
    onHighlightedIndexChange({ highlightedIndex }) {
      palette.setHighlightedIndex(highlightedIndex);
    },

    inputValue: palette.input.value,
    onInputValueChange({ inputValue }) {
      palette.setInputValue(inputValue);
    },

    onSelectedItemChange({ selectedItem }) {
      if (selectedItem) {
        void palette.execute(selectedItem);
      }
    },

    stateReducer(state, { type, changes }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          return { ...changes, highlightedIndex: 0 };

        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          return { ...changes, inputValue: state.inputValue, highlightedIndex: state.highlightedIndex };

        default:
          return changes;
      }
    },
  });
}
