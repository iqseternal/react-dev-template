import { FullSize } from '@libs/styled';
import { commonStyles } from '@scss/common';

import { combinationCName } from '@libs/common';
import styles from './index.module.scss';



export default function Login() {

  return <FullSize
    className={combinationCName(
      styles.login,
      commonStyles.fullSize
    )}
  >
    Login
  </FullSize>
}
