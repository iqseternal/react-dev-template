import { HashRouter, Router, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { FullSize } from '@libs/styled';
import { combinationCName } from '@libs/common';
import { commonStyles } from '@scss/common';
import { GuardsContext } from '@router/guards';

import ReactDOM from 'react-dom/client';
import RouterContext from './router';
import styles from './app.module.scss';

export default function App() {

  return (
    <FullSize
      className={combinationCName(
        styles.app
      )}
    >
      <BrowserRouter>
        <RouterContext />
      </BrowserRouter>
    </FullSize>
  )
}
