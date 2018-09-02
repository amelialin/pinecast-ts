import * as React from 'react';

export default ({color = '#58595B'}: {color?: string}) => (
  <svg width="23" height="6" xmlns="http://www.w3.org/2000/svg">
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
