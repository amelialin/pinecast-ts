import * as numeral from 'numeral';
import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

const MinorPrice_ = styled(
  'div',
  ({$unit, $size}: {$unit: string; $size: number}) => ({
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
      content: `"${$unit}"`,
      display: 'inline-flex',
      fontSize: $size - 8,
      order: 2,
      position: 'relative',
      top: 4,
    },
  }),
);

type Props = {amount: number; unit: string; size: number; style?: CSS};
const MinorPrice = ({amount, unit, size, style}: Props) => (
  <MinorPrice_ $unit={unit} $size={size} style={style}>
    {numeral(amount / 100).format('$0,0.00')}
  </MinorPrice_>
);

export default MinorPrice as React.ComponentType<Props>;
