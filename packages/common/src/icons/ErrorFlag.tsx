import * as React from 'react';

import {CommonProps} from './types';

export default ({
  color = '#58595B',
  height = 24,
  width,
  ...rest
}: CommonProps) => (
  <svg
    height={height}
    viewBox="0 0 19 24"
    width={width}
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
      <path d="M.5 12.503h11v-11H.5z" />
      <path d="M11.5 4.503h7v12h-11l4-4" />
      <path d="M.5.503v23" />
      <path d="M7.5 16.503v-4" />
    </g>
  </svg>
);
