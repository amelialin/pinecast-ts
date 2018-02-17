import * as React from 'react';

const Italic = ({
  style,
  innerStyle,
}: {
  style?: React.CSSProperties;
  innerStyle?: Object;
}) => (
  <svg viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg" style={style}>
    <g
      stroke="#58595B"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...innerStyle}
    >
      <path d="M13.5.5l-9 23" />
      <path d="M.5 23.5h8" />
      <path d="M9.5.5h8" />
    </g>
  </svg>
);

export default Italic;
