import * as React from 'react';

const NumberedList = ({
  style,
  innerStyle,
}: {
  style?: React.CSSProperties;
  innerStyle?: Object;
}) => (
  <svg viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg" style={style}>
    <g
      stroke="#58595B"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...innerStyle}
    >
      <path d="M6.5 4.5h17" />
      <path d="M6.5 12.5h17" />
      <path d="M6.5 20.5h17" />
      <path d="M3.5 14.5h-3v-1l3-1.5v-1.5L2 9.5l-1.5 1v.5" />
      <path d="M.5 6.5h3" />
      <path d="M2.5 6.5v-5L.5 3" />
      <path d="M1.5 19.5l2 .5v1.5l-1.499 1H.5" />
      <path d="M.5 17.5h3l-2 2" />
    </g>
  </svg>
);

export default NumberedList;
