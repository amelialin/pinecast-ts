import * as React from 'react';

import {IconProps} from './types';

export default ({color = 'rgba(0, 0, 0, 0.2)', size, style}: IconProps) => (
  <svg
    width={size}
    height={size}
    style={style}
    viewBox="0 0 23 23"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke={color}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.5 16.503l-1.5-1.5 1.5-1.5 1.5 1.5z" />
      <path d="M12 11.503h-1l-1-6h3z" />
      <path d="M11.5 22.503l-11-11 11-11 11 11z" />
    </g>
  </svg>
);
