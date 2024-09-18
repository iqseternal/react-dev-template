import { FullSize } from '@libs/styled';
import { commonStyles } from '@scss/common';
import { combinationCName } from '@libs/common';
import { useUserStore, userLogin, useAuthHasAuthorized, authHasAuthorized } from '@/features';
import { useCallback, useEffect } from 'react';
import { toPicket } from '@suey/pkg-utils';
import { useShallowReactive, useAsyncEffect } from '@libs/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { retrieveRoutes } from '@/router';

import styles from './index.module.scss';

export default function Login() {
  const navigate = useNavigate();

  const [state] = useShallowReactive({
    loginLoading: false
  })

  const jumpDashRoute = useCallback(() => {
    const { dashRoute } = retrieveRoutes();
    navigate(dashRoute.meta.fullPath, { replace: true });
  }, []);

  const login = useCallback(async () => {
    state.loginLoading = true;

    const [err] = await toPicket(userLogin({
      username: 'wwww',
      password: 'ass'
    }));
    if (err) {
      console.error(`登录失败`, err);
      return;
    }
    jumpDashRoute();
    state.loginLoading = false;
  }, []);

  useAsyncEffect(async () => {
    const [err, hasAuthorized] = await toPicket(authHasAuthorized());
    if (err) return;

    if (hasAuthorized) jumpDashRoute();
  }, []);

  return <FullSize
    className={combinationCName(
      styles.login,
      commonStyles.fullSize
    )}
  >
    <button
      onClick={login}
    >
      登录
    </button>
  </FullSize>
}
