import * as React from 'react';

import styled from '@pinecast/styles';

type Props = {
  $color?: 'gray' | 'green' | 'blue' | 'yellow' | 'red';
};

const Tag = styled('span', ({$color = 'gray'}: Props) => {
  const out = {
    backgroundColor: '#dee1df',
    borderRadius: '0.2em',
    color: '#44484d',
    display: 'inline-flex',
    flex: '0 0 0%',
    padding: '2px 4px',
    whiteSpace: 'nowrap',
  };
  switch ($color) {
    case 'gray':
      break;
    case 'green':
      // TODO: Get these colors documented
      out.backgroundColor = '#8aeabf';
      out.color = '#146640';
      break;
    case 'red':
      // TODO: Get these colors documented
      out.backgroundColor = '#FEDEDE';
      out.color = '#BF1D1D';
      break;
    default:
      throw new Error('TODO: Color has not been finalized');
  }
  return out;
});

export default Tag as React.ComponentType<
  Props & {style?: React.CSSProperties}
>;
