import * as React from 'react';

import {CommonProps} from '../types';

export default ({
  color = '#58595B',
  height = 6,
  width,
  ...rest
}: CommonProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 23 6"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g
      stroke={color}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.5 3.753l-2 1.25-2-1.25v-2l2-1.25 2 1.25zM13.5 3.753l-2 1.25-2-1.25v-2l2-1.25 2 1.25zM4.5 3.753l-2 1.25-2-1.25v-2l2-1.25 2 1.25z" />
    </g>
  </svg>
);
