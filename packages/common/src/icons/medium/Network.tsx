import * as React from 'react';

const Network = ({
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
      <path d="M29 26.219L21.5 31 14 26.219V18.78L21.5 14l7.5 4.781z" />
      <path d="M9 11.5L5.002 14 1 11.5v-4L5.002 5 9 7.5z" />
      <path d="M40 7.5L36.002 10 32 7.5v-4L36.002 1 40 3.5z" />
      <path d="M9 41.5L5.002 44 1 41.5v-4L5.002 35 9 37.5z" />
      <path d="M43 44.5L39.002 47 35 44.5v-4l4.002-2.5L43 40.5z" />
      <path d="M47 23.5L43.002 26 39 23.5v-4l4.002-2.5L47 19.5z" />
      <path d="M14 18l-6-5" />
      <path d="M36 39L25.5 28.5" />
      <path d="M38 22h-8.5" />
      <path d="M17 29l-8 8" />
      <path d="M34 9l-7 7" />
    </g>
  </svg>
);

export default Network;
