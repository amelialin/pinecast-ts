import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled from '@pinecast/styles';

const P = styled('p', {
  fontFamily: DEFAULT_FONT,
  fontWeight: 300,
  fontSize: 20,
  lineHeight: 32,
  marginBottom: 0,
  marginTop: -60,
  paddingBottom: 52,
  paddingTop: 40,
  textAlign: 'center',
});

const Subheading = ({
  children,
}: {
  children: Array<JSX.Element | string> | JSX.Element | string | null;
}) => <P>{children}</P>;

export default Subheading;
