
import type { FC, HTMLAttributes } from 'react';
import { forwardRef } from 'react';



const NotFound = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {



  return <div ref={ref} {...props}>

    NotFound
  </div>;
})

export default NotFound;
