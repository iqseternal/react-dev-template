import type { FC, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

const NotRole = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return <div ref={ref} {...props}>

    NotRole
  </div>;
})

export default NotRole;
