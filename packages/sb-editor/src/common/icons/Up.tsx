import * as React from 'react';

export default ({color = '#58595B'}: {color?: string}) => (
  <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
    <g
      stroke={color}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 10.503l4-4 4 4" />
      <path d="M10.5 6.503v10" />
      <path d="M20.5 17.003l-10 5.5-10-5.5v-11l10-5.5 10 5.5z" />
    </g>
  </svg>
);
