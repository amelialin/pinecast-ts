import * as React from 'react';

export default ({
  color = '#58595B',
  height = 24,
  width,
  ...rest
}: {color?: string; height?: number; width?: number} & React.SVGAttributes<
  SVGSVGElement
>) => (
  <svg
    height={height}
    viewBox="0 0 21 24"
    width={width}
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
      <path d="M20.5 17.003l-10 5.5-10-5.5v-11l10-5.5 10 5.5z" />
      <path d="M5 11.503l4.5 4 6.5-8" />
    </g>
  </svg>
);
