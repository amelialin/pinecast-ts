import * as React from 'react';

import {CommonProps} from '../types';

export default ({
  color = '#44484d',
  height = 24,
  width,
  ...rest
}: CommonProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 24"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g stroke={color} fill="none" fillRule="evenodd" strokeLinejoin="round">
      <path d="M8.5 15.5v-6l5 3z" />
      <path d="M20.5 18l-10 5.5L.5 18V7l10-5.5 10 5.5z" />
    </g>
  </svg>
);
