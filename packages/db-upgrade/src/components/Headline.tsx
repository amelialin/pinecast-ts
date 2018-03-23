import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled from '@pinecast/styles';

const H = styled('h1', {
  fontFamily: DEFAULT_FONT,
  fontWeight: 300,
  fontSize: 28,
  lineHeight: 36,
  paddingBottom: 60,
  paddingTop: 60,
  textAlign: 'center',
});

const Headline = ({
  children,
}: {
  children: Array<JSX.Element | string> | JSX.Element | string | null;
}) => <H>{children}</H>;

export default Headline;
