import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Text = styled('span', {
  display: 'block',
  fontFamily: 'Fira Mono',
  fontSize: 13,
  fontWeight: 500,
  margin: 0,
});

const Label = ({
  children,
  text,
}: {
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  text: JSX.Element | string;
}) => (
  <label>
    <Text>{text}</Text>
    {children}
  </label>
);

export default Label;
