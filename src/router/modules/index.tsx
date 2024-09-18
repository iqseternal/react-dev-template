import { lazy } from 'react';
import { makeRoute } from '@libs/router';
import type { RequiredRouteConfig } from '@libs/router';
import { loginRoute, notFoundRoute, notRoleRoute } from './basic';

import RootLayout from '@/layouts/RootLayout';
import DashLayout from '@/layouts/DashLayout';

export * from './basic';

export const dashRoute = makeRoute({
  name: `Workbenches`,
  path: `/workbenches`, redirect: 'workstation',
  component: <DashLayout />,
  children: [
    {
      name: 'Workstation',
      path: '/workstation',
      component: lazy(() => import('@pages/Workstation'))
    }
  ]
} as const);

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/', redirect: loginRoute.meta.fullPath,
  component: <RootLayout />,
  children: [
    loginRoute,
    notFoundRoute, notRoleRoute,
    dashRoute
  ]
});
