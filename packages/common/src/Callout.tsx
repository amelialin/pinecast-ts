import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

export type CalloutType = 'info' | 'negative' | 'positive';

const Callout_ = styled('div', ({$type}: {$type: CalloutType}) => ({
  backgroundColor:
    $type === 'info' ? '#eeefea' : $type === 'negative' ? '#FEDEDE' : '#8aeabf',
  borderRadius: 3,
  color:
    $type === 'info' ? '#333' : $type === 'negative' ? '#BF1D1D' : '#146640',
  fontWeight: 500,
  margin: '12px 0',
  padding: 12,
}));

const Callout = ({
  children,
  style,
  type,
}: {
  children: any;
  style?: CSS;
  type: CalloutType;
}) => (
  <Callout_ $type={type} role="alert" style={style}>
    {children}
  </Callout_>
);

export default Callout;
