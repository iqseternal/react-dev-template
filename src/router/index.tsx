import { Suspense } from 'react';
import type { ReactElement } from 'react';
import { Routes } from 'react-router-dom';
import { loginRoute, notFoundRoute, notRoleRoute } from './modules';
import { makeRoute, createRoutesChildren, reserveRoutes } from '@libs/router';

import RootLayout from '@/layouts/RootLayout';
import * as presetRoutes from './modules';

export const { retrieveRoutes } = reserveRoutes(presetRoutes);

export default function RouterContext() {
  return <Suspense
    fallback={<>
      <div>正在加载组件 ....</div>
      <div>当然, 你可能在出错的时候才有可能看到此页面....</div>
    </>}
  >
    <Routes>
      {createRoutesChildren([presetRoutes.rootRoute], {
        /**
         * 异步 lazy 组件展示
         * @returns {ReactElement}
         */
        onLazyComponent: ({ children }): ReactElement => {

          return <Suspense fallback={
            <>
              加载中...
            </>
          }>
            {children}
          </Suspense>
        }
      })}
    </Routes>
  </Suspense>
}
