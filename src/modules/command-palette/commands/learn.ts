import { CommandPalette } from '@design-system';

import { IconExternalLink, IconGlobe } from 'src/icons';
import { createTranslate, useTranslate } from 'src/intl/translate';

const T = createTranslate('modules.commandPalette.commands');

export function useLearnCommands() {
  const t = T.useTranslate();
  const t2 = useTranslate();

  return (palette: CommandPalette) => {
    const group = palette.addGroup({
      label: t2('modules.commandPalette.contexts.learn'),
    });

    group.addItem({
      label: t('learn:community.label'),
      description: t('learn:community.description'),
      Icon: IconExternalLink,
      execute: () => window.open('http://community.khulnasoft.com'),
    });

    group.addItem({
      label: t('learn:khulnasoft.com.label'),
      description: t('learn:khulnasoft.com.description'),
      Icon: IconGlobe,
      execute: () => window.open('http://www.khulnasoft.com'),
    });

    return () => {
      group.remove();
    };
  };
}
