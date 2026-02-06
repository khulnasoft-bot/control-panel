import clsx from 'clsx';
import { UseComboboxReturnValue } from 'downshift';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

import { CommandPalette, CommandPaletteItem } from './use-command-palette';

type ItemListProps = {
  palette: CommandPalette;
  combobox: UseComboboxReturnValue<CommandPaletteItem>;
  noResults?: () => React.ReactNode;
};

export function ItemList({ palette, combobox, noResults }: ItemListProps) {
  const contexts = [{ id: undefined, label: null }, ...palette.contexts];

  return (
    <div {...combobox.getMenuProps()} className="col flex-1 gap-2 overflow-y-auto py-2">
      {palette.items.length === 0 && noResults?.()}

      {contexts.map((context) => (
        <Fragment key={context.id ?? ''}>
          {context.label && <div className="px-3 text-xs font-bold text-dim">{context.label}</div>}

          {palette.items
            .filter((item) => item.contextId === context.id)
            .map((item) => (
              <Item
                key={item.id}
                item={item}
                isHighlighted={palette.items.indexOf(item) === combobox.highlightedIndex}
                props={combobox.getItemProps({ item, index: palette.items.indexOf(item) })}
              />
            ))}
        </Fragment>
      ))}
    </div>
  );
}

type ItemProps = {
  item: CommandPaletteItem;
  isHighlighted: boolean;
  props: Record<string, unknown>;
};

function Item({ item, isHighlighted, props }: ItemProps) {
  const { Icon, label, description, hasSubItems } = item;

  return (
    <div
      className={clsx('mx-1 row items-center gap-3 rounded-md p-2', isHighlighted && 'bg-muted')}
      {...props}
    >
      {Icon && (
        <div>
          <Icon className="size-6 text-dim" />
        </div>
      )}

      <div className="col flex-1 gap-1">
        <div>{label}</div>
        {description && <div className="text-xs text-dim">{description}</div>}
      </div>

      {hasSubItems && (
        <div>
          <ChevronRight className="size-4" />
        </div>
      )}
    </div>
  );
}
