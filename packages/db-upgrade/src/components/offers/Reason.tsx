import * as React from 'react';

import {Children} from '@pinecast/common/types';
import styled from '@pinecast/styles';

const Wrap = styled('div', {
  display: 'block',
  lineHeight: 32,
});

const Reason = ({children}: {children: Children}) => <Wrap>{children}</Wrap>;

export default Reason;
