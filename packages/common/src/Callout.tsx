import * as React from 'react';

import {Children} from '@pinecast/common/types';
import styled, {CSS} from '@pinecast/styles';

export type CalloutType = 'info' | 'negative' | 'positive';

const Callout_ = styled(
  'div',
  ({$type}: {$type: CalloutType}) => ({
    backgroundColor:
      $type === 'info'
        ? '#eeefea'
        : $type === 'negative'
          ? '#FEDEDE'
          : '#8aeabf',
    borderRadius: 3,
    color:
      $type === 'info' ? '#333' : $type === 'negative' ? '#BF1D1D' : '#146640',
    fontWeight: 500,
    margin: '12px 0',
    padding: 12,
  }),
  {role: 'alert'},
);

const Callout = ({
  children,
  style,
  type,
}: {
  children: Children;
  style?: CSS;
  type: CalloutType;
}) => (
  <Callout_ $type={type} style={style}>
    {children}
  </Callout_>
);

export default Callout;
