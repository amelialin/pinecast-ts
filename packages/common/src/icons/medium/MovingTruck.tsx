import * as React from 'react';

import {CommonProps} from '../types';

const MovingTruck = ({
  color = 'currentColor',
  height,
  width,
  ...rest
}: CommonProps) => (
  <svg
    height={height}
    viewBox="0 0 50 41"
    width={width}
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
      <path d="M43.021 35H49V1H9.273L3 13h7.32" />
      <path d="M15 35h19" />
      <path d="M6.911 35h-3.8L1 32l.006-6 5.27-5 4.227-8H20v18" />
      <path d="M47 31h2" />
      <path d="M1 31h4" />
      <path d="M18 31h12" />
      <path d="M20 9h-8l2-4h6z" />
      <path d="M20 17h29" />
      <path d="M26 9h19V5H26z" />
      <path d="M6 21h13" />
      <path d="M15 24h-2" />
      <path d="M15 37.5L11 40l-4-2.5v-4l4-2.5 4 2.5z" />
      <path d="M43 37.5L39 40l-4-2.5v-4l4-2.5 4 2.5z" />
    </g>
  </svg>
);

export default MovingTruck;
