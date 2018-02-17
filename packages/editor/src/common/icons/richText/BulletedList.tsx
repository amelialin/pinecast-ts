import * as React from 'react';

const BulletedList = ({
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
      <path d="M8.5 3.5h15" />
      <path d="M8.5 11.5h15" />
      <path d="M8.5 19.5h15" />
      <path d="M4.5 4.75L2.5 6l-2-1.25v-2l2-1.25 2 1.25z" />
      <path d="M4.5 12.75L2.5 14l-2-1.25v-2l2-1.25 2 1.25z" />
      <path d="M4.5 20.75L2.5 22l-2-1.25v-2l2-1.25 2 1.25z" />
    </g>
  </svg>
);

export default BulletedList;
