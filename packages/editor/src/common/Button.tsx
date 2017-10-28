import * as React from 'react';

import styled from '@pinecast/sb-styles';

const NativeButton = styled('button', ({isPrimary}: {isPrimary?: boolean}) => ({
  display: 'inline-flex',
  backgroundColor: isPrimary ? '#8d52d1' : '#fff',
  border: 0,
  borderRadius: 3,
  boxShadow:
    '0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15)',
  fontFamily: 'Fira Mono',
  fontSize: 13,
  fontWeight: 500,
  height: 30,
  padding: '0 15px',
  transition: 'box-shadow 0.2s',

  ':hover': {
    boxShadow:
      '0 3px 7px rgba(0, 0, 0, 0.2), 0 8px 17px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15)',
  },
  ':active': {
    boxShadow:
      '0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 17px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15)',
  },
}));

const Button = ({
  children,
  style,
  ...rest,
}: {
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  style?: React.CSSProperties;
  [key: string]: any;
}) => (
  <NativeButton {...rest} style={style}>
    {children}
  </NativeButton>
);

export default Button;
