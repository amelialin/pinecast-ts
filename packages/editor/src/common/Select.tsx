import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';

const Wrapper = styled('div', {
  alignItems: 'center',
  background: '#fff',
  borderRadius: 3,
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  display: 'flex',
  fontSize: 14,
  height: '1.75em',
  marginBottom: 20,
  opacity: 1,
  position: 'relative',
  transition: 'box-shadow 0.2s, opacity 0.2s',

  ':hover': {
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  },
  ':active': {
    boxShadow:
      '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  },
  ':disabled': {
    opacity: 0.5,
  },

  ':before': {
    border: '2px solid #222',
    borderLeft: 0,
    borderTop: 0,
    content: '""',
    display: 'block',
    height: 6,
    position: 'absolute',
    right: 10,
    transform: 'translateY(-2px) rotate(45deg)',
    width: 6,
  },
});
const Select_ = styled('select', {
  appearance: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',
  background: 'transparent',
  border: 0,
  borderRadius: 3,
  boxShadow: 'rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  height: '100%',
  lineHeight: '100%',
  margin: 0,
  padding: '0 25px 0 10px',
  transition: 'box-shadow 0.2s',
  width: '100%',

  ':focus': {
    boxShadow: 'rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
    outline: 'none',
  },
});

const Select = ({
  onChange,
  options,
  style,
  value,
}: {
  onChange: (string) => void;
  options: {[key: string]: string};
  style?: React.CSSProperties;
  value: string;
}) => (
  <Wrapper style={style}>
    <Select_ onChange={e => onChange(e.target.value)} value={value}>
      {Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))}
    </Select_>
  </Wrapper>
);

export default Select;
