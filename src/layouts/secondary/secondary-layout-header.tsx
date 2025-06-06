import clsx from 'clsx';

import { isApiError } from 'src/api/api-errors';
import { useOrganizationQuery, useUserQuery } from 'src/api/hooks/session';
import { routes } from 'src/application/routes';
import { Link } from 'src/components/link';
import LogoSnipkit from 'src/components/logo-snipkit.svg?react';

import { OrganizationSwitcher } from '../organization-switcher';

import { UserMenu } from './user-menu';

export function SecondaryLayoutHeader({ background }: { background?: boolean }) {
  const organizationQuery = useOrganizationQuery();
  const userQuery = useUserQuery();

  const accountLocked = userQuery.isError && isApiError(userQuery.error) && userQuery.error.status === 403;
  const isAuthenticated = userQuery.isSuccess || accountLocked;

  return (
    <header
      className={clsx(
        'row sticky top-0 z-10 flex-wrap items-center gap-6 px-6 py-4',
        background && 'bg-gradient-to-b from-neutral from-75% to-transparent',
      )}
    >
      <Link href={routes.home()}>
        <LogoSnipkit className={clsx('h-8 self-start', !background && 'text-white')} />
      </Link>

      {isAuthenticated && (
        <>
          {organizationQuery.isSuccess && <OrganizationSwitcher className="w-full max-w-48" />}
          <UserMenu />
        </>
      )}
    </header>
  );
}
