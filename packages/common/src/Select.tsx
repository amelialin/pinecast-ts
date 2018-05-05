import * as React from 'react';

import styled from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const Wrapper = styled('div', {
  alignItems: 'center',
  background: '#fff',
  borderRadius: 3,
  display: 'flex',
  fontSize: 14,
  height: 30,
  opacity: 1,
  position: 'relative',
  transition: 'box-shadow 0.2s, opacity 0.2s',

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
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
  borderRadius: 3,
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  height: '100%',
  lineHeight: '100%',
  margin: 0,
  padding: '0 25px 0 10px',
  transition: 'box-shadow 0.2s, opacity 0.2s',
  width: '100%',

  ':hover': {
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
  },
  ':active': {
    boxShadow:
      '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
  },
  ':disabled': {
    opacity: 0.5,
  },

  ':focus': {
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), inset 0 0 0 0.5px #9eb4c0, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
    outline: 'none',
  },
  ':focus:hover': {
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #9eb4c0, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
  },
  ':focus:active': {
    boxShadow:
      '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #9eb4c0, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
  },
});

export type Option = {
  key: string | number;
  label: string;
};

const Select = ({
  autoFocus,
  disabled,
  onChange,
  options,
  style,
  tabIndex,
  value,
}: {
  autoFocus?: boolean;
  disabled?: boolean;
  onChange: (newValue: string) => void;
  options: Array<Option>;
  style?: React.CSSProperties;
  tabIndex?: number;
  value: string;
}) => (
  <Wrapper style={style}>
    <Select_
      autoFocus={autoFocus}
      disabled={disabled}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        onChange(e.target.value)
      }
      tabIndex={tabIndex}
      value={value}
    >
      {options.map(({key, label}) => (
        <option key={String(key)} value={key}>
          {label}
        </option>
      ))}
    </Select_>
  </Wrapper>
);

export default Select;
