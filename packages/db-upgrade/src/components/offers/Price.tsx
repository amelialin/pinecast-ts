import numeral from 'numeral';
import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

const Price_ = styled(
  'div',
  ({$period, $size}: {$period: 'mo' | 'yr'; $size: number}) => ({
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: $size,
    fontWeight: 400,
    justifyContent: 'center',
    textAlign: 'center',

    '::before': {
      background: '#000',
      content: '""',
      display: 'inline-block',
      height: $size * 0.6,
      margin: '0 4px',
      order: 1,
      transform: 'translateY(4px) rotate(35deg)',
      width: 1,
    },
    '::after': {
      content: `"${$period}"`,
      display: 'inline-flex',
      fontSize: $size - 8,
      order: 2,
      position: 'relative',
      top: 4,
    },
  }),
);

type Props = {amount: number; period: 'mo' | 'yr'; size: number; style?: CSS};
const Price = ({amount, period, size, style}: Props) => (
  <Price_ $period={period} $size={size} style={style}>
    {numeral(amount / 100).format('$0,0')}
  </Price_>
);

export default Price as React.ComponentType<Props>;
