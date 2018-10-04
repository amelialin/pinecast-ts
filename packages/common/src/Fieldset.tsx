import * as React from 'react';

import {Children} from '@pinecast/common/types';
import styled, {CSS} from '@pinecast/styles';

const Wrapper = styled('section', {
  appearance: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',
  backgroundColor: 'inherit',
  border: 0,
  borderRadius: 4,
  boxShadow:
    '0 0 2px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px #dee1df',
  display: 'block',
  flexDirection: 'columm',
  margin: '16px 0 20px',
  padding: '16px 12px 0.5px',
  position: 'relative',
});
const Legend = styled('div', {
  backgroundColor: 'inherit',
  border: 0,
  borderRadius: 3,
  color: '#4e7287',
  display: 'inline-flex',
  fontSize: 12,
  fontWeight: 500,
  left: 12,
  lineHeight: '12px',
  margin: '0 0 8px -4px',
  padding: '2px 4px',
  position: 'absolute',
  textTransform: 'uppercase',
  top: 'calc(-0.5em - 2px)',
});

type Props = {
  children: Children;
  label: string | React.ReactNode;
  style?: CSS;
};

const Fieldset = ({children, label, style}: Props) => (
  <Wrapper style={style}>
    <Legend>{label}</Legend>
    <div>{children}</div>
  </Wrapper>
);

export default Fieldset;
