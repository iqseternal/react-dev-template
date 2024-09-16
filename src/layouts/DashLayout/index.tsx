import { useEffect, useLayoutEffect, useRef, useState, useCallback, useContext, useMemo, forwardRef, FC } from 'react';
import { Outlet, useOutlet, useLocation, useOutletContext } from 'react-router-dom';
import { CSSTransition, Transition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import { MaxScreen, MaxScreenWidth, Flex, MaxScreenHeight, MaxViewHeight, combinationStyled, FullSizeWidth, FullSize } from '@libs/styled';
import { commonStyles, useAnimationClassSelector } from '@scss/common';
import { Guards } from '@router/guards';

import styles from './index.module.scss';

const MainRootContainer = combinationStyled('div', FullSize);
const MainContainer = combinationStyled('main', FullSize);

/**
 * 工作区的布局组件, 该组件提供了整个 App 最核心的布局容器, 拥有 react-transition-group 为工作区提供切换动画的显示
 * 该工作区需要用户登录后才可以正常使用, 因此使用 Guards.AuthAuthorized 来校验用户是否已经获得了授权
 */
const DashLayout = Guards.AuthAuthorized(() => {
  const currentOutlet = useOutlet();

  return <FullSize
    className={styles.workbenchesLayout}
  >
    {currentOutlet}
  </FullSize>
});


export default DashLayout;
