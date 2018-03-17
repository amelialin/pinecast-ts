import * as React from 'react';

import Button from '@pinecast/common/Button';

const FullScreenButton = ({
  onClick,
  style,
}: {
  onClick: () => void;
  style: React.CSSProperties;
}) => (
  <Button
    onClick={onClick}
    style={{
      color: '#616669',
      paddingLeft: 5,
      paddingRight: 5,
      ...style,
    }}
    title="Toggle full screen"
  >
    <svg
      height={20}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 298.667 298.667"
    >
      <path fill="currentColor" d="M42.667 192H0v106.667h106.667V256h-64z" />
      <path fill="currentColor" d="M0 106.667h42.667v-64h64V0H0z" />
      <path fill="currentColor" d="M192 0v42.667h64v64h42.667V0z" />
      <path fill="currentColor" d="M256 256h-64v42.667h106.667V192H256z" />
    </svg>
  </Button>
);

export default FullScreenButton;
