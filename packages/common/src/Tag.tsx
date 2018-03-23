import * as React from 'react';

import styled from '@pinecast/styles';

type Props = {
  $color?: 'gray' | 'green' | 'blue' | 'yellow' | 'red';
};

const Tag = styled('span', ({$color = 'gray'}: Props) => {
  const out = {
    backgroundColor: '#dee1df',
    borderRadius: '0.2em',
    color: '#616669',
    display: 'inline-flex',
    flex: '0 0 0%',
    padding: '2px 4px',
    whiteSpace: 'nowrap',
  };
  switch ($color) {
    case 'green':
      // TODO: Get these colors documented
      out.backgroundColor = '#a2e5c7';
      out.color = '#146640';
      break;
    case 'gray':
      break;
    default:
      throw new Error('TODO: Color has not been finalized');
  }
  return out;
});

export default Tag as React.ComponentType<
  Props & {style?: React.CSSProperties}
>;
