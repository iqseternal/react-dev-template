import { lazy } from 'react';
import { makeRoute } from '@libs/router';
import type { RequiredRouteConfig } from '@libs/router';
import { loginRoute, notFoundRoute, notRoleRoute } from './basic';

import RootLayout from '@/layouts/RootLayout';
import DashLayout from '@/layouts/DashLayout';

export * from './basic';

export const DashRoute = makeRoute({
  name: `Workbenches`,
  path: `/workbenches`, redirect: 'home',
  component: <DashLayout />,
  children: [

  ]
} as const);

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/', redirect: 'login',
  component: <RootLayout />,
  children: [
    loginRoute,
    notFoundRoute, notRoleRoute,
    DashRoute
  ]
});
