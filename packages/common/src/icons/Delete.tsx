import * as React from 'react';

export default ({
  color = '#58595B',
  style,
}: {
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg width="22" height="23" style={style} xmlns="http://www.w3.org/2000/svg">
    <g
      stroke={color}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 5.503H1l1.5-3h17z" />
      <path d="M3.5 22.503h15v-17h-15z" />
      <path d="M13.5.503h-5l-1 2h7z" />
      <path d="M9.5 8.503v11" />
      <path d="M12.5 8.503v11" />
      <path d="M6.5 8.503v11" />
      <path d="M15.5 8.503v11" />
    </g>
  </svg>
);
