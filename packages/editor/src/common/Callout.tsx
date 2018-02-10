import * as React from 'react';

import styled from '@pinecast/sb-styles';

export type CalloutType = 'info' | 'negative' | 'positive';

const Callout_ = styled('div', ({$type}: {$type: CalloutType}) => ({
  backgroundColor:
    $type === 'info' ? '#eeefea' : $type === 'negative' ? '#EF6B6B' : '#51D197',
  borderRadius: 3,
  color: '#333',
  padding: 12,
}));

const Callout = ({children, type}: {children: any; type: CalloutType}) => (
  <Callout_>{children}</Callout_>
);

export default Callout;
