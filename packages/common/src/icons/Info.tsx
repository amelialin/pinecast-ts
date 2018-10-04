import * as React from 'react';

import {CommonProps} from './types';

const Info = ({
  color = 'currentColor',
  height = 21,
  width = 24,
  ...rest
}: CommonProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 24"
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
      <path d="M10.5 6.503L9 5.003l1.5-1.5 1.5 1.5zm1 9v-7h-4v2h2v5h-2v2h6v-2z" />
      <path d="M20.5 17.003l-10 5.5-10-5.5v-11l10-5.5 10 5.5z" />
    </g>
  </svg>
);

export default Info;
