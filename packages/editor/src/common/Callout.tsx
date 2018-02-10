import * as React from 'react';

import styled, {CSS} from '@pinecast/sb-styles';

export type CalloutType = 'info' | 'negative' | 'positive';

const Callout_ = styled('div', ({$type}: {$type: CalloutType}) => ({
  backgroundColor:
    $type === 'info' ? '#eeefea' : $type === 'negative' ? '#EF6B6B' : '#51D197',
  borderRadius: 3,
  color: $type === 'info' ? '#333' : '#fff',
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
  <Callout_ $type={type} style={style}>
    {children}
  </Callout_>
);

export default Callout;
