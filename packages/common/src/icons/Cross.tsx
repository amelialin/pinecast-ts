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
    viewBox="0 0 21 24"
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
      <path d="M6 7.003l9 9" />
      <path d="M15 7.003l-9 9" />
      <path d="M20.5 17.003l-10 5.5-10-5.5v-11l10-5.5 10 5.5z" />
    </g>
  </svg>
);
