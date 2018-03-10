import * as React from 'react';

import styled from '@pinecast/sb-styles';

// TODO: Make this use <progress>
const Wrapper = styled('div', ({$percent}: {$percent: number}) => ({
  backgroundColor: '#dee1df',
  borderRadius: 3,
  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  height: 16,
  overflow: 'hidden',

  ':before': {
    backgroundColor: '#52d1c7',
    backgroundImage:
      'linear-gradient(180deg, rgba(0, 0, 0, 0.1), transparent 8%, transparent)',
    content: '""',
    display: 'flex',
    transition: 'width 0.2s',
    width: `${$percent}%`,
  },
}));

const Progress = ({
  percent,
  style,
}: {
  percent: number;
  style?: React.CSSProperties;
}) => <Wrapper $percent={percent} style={style} />;

export default Progress;
