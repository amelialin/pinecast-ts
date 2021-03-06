import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

export type CalloutType = 'info' | 'negative' | 'positive';

const Callout_ = styled(
  'div',
  ({$hasAction, $type}: {$hasAction: boolean; $type: CalloutType}) => ({
    alignItems: 'center',
    backgroundColor:
      $type === 'info'
        ? '#eeefea'
        : $type === 'negative'
          ? '#FEDEDE'
          : '#8aeabf',
    borderRadius: 3,
    color:
      $type === 'info' ? '#333' : $type === 'negative' ? '#BF1D1D' : '#146640',
    display: 'flex',
    fontWeight: 500,
    justifyContent: $hasAction ? 'space-between' : undefined,
    margin: '0 0 12px',
    padding: 12,
  }),
  {role: 'alert'},
);

const ActionWrap = styled('div', {marginRight: 12});

const Callout = ({
  action,
  children,
  style,
  type,
}: {
  action?: React.ReactNode;
  children: React.ReactNode;
  style?: CSS;
  type: CalloutType;
}) => (
  <Callout_ $hasAction={action != null} $type={type} style={style}>
    {action ? (
      <React.Fragment>
        <ActionWrap>{children}</ActionWrap>
        {action}
      </React.Fragment>
    ) : (
      children
    )}
  </Callout_>
);

export default Callout;
