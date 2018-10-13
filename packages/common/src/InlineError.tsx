import * as React from 'react';

import styled from '@pinecast/styles';

import {ErrorFlag} from './icons';

const ErrorWrap = styled('div', {
  alignItems: 'center',
  color: '#d24242',
  display: 'flex',
  padding: '4px 0',
});

const InlineError = ({error}: {error: React.ReactNode}) => (
  <ErrorWrap>
    <ErrorFlag color="#d24242" height={20} style={{marginRight: 8}} />
    {error}
  </ErrorWrap>
);

export default InlineError;
