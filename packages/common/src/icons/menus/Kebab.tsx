import * as React from 'react';

export default ({color = '#58595B'}: {color?: string}) => (
  <svg width="5" height="25" xmlns="http://www.w3.org/2000/svg">
    <g
      stroke={color}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 4.253l-2 1.25-2-1.25v-2l2-1.25 2 1.25z" />
      <path d="M4.5 13.253l-2 1.25-2-1.25v-2l2-1.25 2 1.25z" />
      <path d="M4.5 22.253l-2 1.25-2-1.25v-2l2-1.25 2 1.25z" />
    </g>
  </svg>
);
