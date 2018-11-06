import * as React from 'react';

import styled from '@pinecast/styles';

const Wrap = styled('div', {
  display: 'block',
  lineHeight: 32,
});

const Reason = ({children}: {children: React.ReactNode}) => (
  <Wrap>{children}</Wrap>
);

export default Reason;
