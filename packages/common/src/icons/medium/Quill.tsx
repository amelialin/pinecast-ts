import * as React from 'react';

const Quill = ({
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
    viewBox="0 0 48 48"
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
      <path d="M33 23h-8v-8L39 1h8v8z" />
      <path d="M13 31l-4-4h22l-4 4z" />
      <path d="M13 31L1 47h38L27 31z" />
      <path d="M16 35l-6 8" />
      <path d="M40 8L21 27" />
    </g>
  </svg>
);

export default Quill;
