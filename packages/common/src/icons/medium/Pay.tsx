import * as React from 'react';

import {CommonProps} from '../types';

const Pay = ({color = 'currentColor', height, width, ...rest}: CommonProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 36"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g
      stroke={color}
      strokeWidth="2"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 13L1 18" />
      <path d="M30 25l-6.885 8L20 31l1.04-3" />
      <path d="M33 25l-2 10-4-2v-4.83" />
      <path d="M11 15.5V1h36v24H25" />
      <path d="M11 5h36" />
      <path d="M47 9H11" />
      <path d="M43 21h-6" />
      <path d="M33 21h-2" />
      <path d="M43 17H27" />
      <path d="M1 35l12-3 10-12-3-2-12 6" />
    </g>
  </svg>
);

export default Pay;
