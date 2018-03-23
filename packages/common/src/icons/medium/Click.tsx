import * as React from 'react';

const Click = ({
  color = 'currentColor',
  height,
  width,
}: {
  color?: string;
  height?: number;
  width?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 42 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke={color}
      strokeWidth="2"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 37V15l4-2 4 2v17l4-2 4 2 4-2 4 2 3-2 3 2v15H7l-3-6 2-8 5-2" />
      <path d="M5 13H1" />
      <path d="M9 7L6 4" />
      <path d="M21 7l3-3" />
      <path d="M15 5V1" />
      <path d="M29 13h-4" />
    </g>
  </svg>
);

export default Click;
