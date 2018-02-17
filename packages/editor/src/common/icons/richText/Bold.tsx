import * as React from 'react';

const Bold = ({
  style,
  innerStyle,
}: {
  style?: React.CSSProperties;
  innerStyle?: Object;
}) => (
  <svg viewBox="0 0 17 25" xmlns="http://www.w3.org/2000/svg" style={style}>
    <g
      stroke="#58595B"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...innerStyle}
    >
      <path d="M3.5 1.5v23" />
      <path d="M3.5 12.5H12L15.5 7 12 1.5H.5" />
      <path d="M12 12.5l4.5 6-4.5 6H.5" />
    </g>
  </svg>
);

export default Bold;
