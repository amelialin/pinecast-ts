import * as React from 'react';

import styled from '@pinecast/styles';

// TODO: Make this use <progress>
const Wrapper = styled('div', ({$percent}: {$percent: number}) => ({
  backgroundColor: '#dee1df',
  borderRadius: 3,
  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  height: 16,
  overflow: 'hidden',

  ':before': {
    backgroundColor: '#1fd2c4',
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
