import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';

const WrapperLabel = styled('label', {
  display: 'flex',
  margin: '10px 0 20px',
});
const InvisibleCheckbox = styled(
  'input',
  {
    border: 0,
    display: 'block',
    flex: '0 0',
    height: 0,
    margin: 0,
    opacity: 0,
    padding: 0,
    width: 0,

    ':checked + .checkBox-text::after': {
      opacity: 1,
      transform: 'scale(1)',
    },

    ':focus': {
      outline: 'none',
    },
    ':focus + .checkBox-text::before': {
      boxShadow: '0 0 0 3px #c9d9e0',
    },
  },
  {type: 'checkbox'},
);

const Text = styled(
  'div',
  ({$disabled}) => ({
    display: 'flex',
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    fontWeight: 500,
    flex: '1 1',
    opacity: $disabled ? 0.5 : 1,
    paddingLeft: 20,
    position: 'relative',
    transition: 'opacity 0.2s',

    '::before': {
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: 3,
      bottom: 0,
      boxShadow: '0 0 0 transparent',
      content: '""',
      height: 16,
      left: 0,
      margin: 'auto',
      position: 'absolute',
      top: 0,
      transition: 'box-shadow 0.2s',
      width: 16,
      zIndex: 1,
    },
    '::after': {
      backgroundImage:
        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath fill='%2332586e' d='M0 11.522l1.578-1.626 7.734 4.619 13.335-12.526 1.353 1.354-14 18.646z'/%3e%3c/svg%3e\")",
      backgroundSize: 'contain',
      bottom: 0,
      content: '""',
      filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15))',
      height: 18,
      left: -1,
      margin: 'auto',
      opacity: 0,
      position: 'absolute',
      top: 0,
      transform: 'scale(0.75)',
      transition: 'transform 0.2s, opacity 0.2s',
      width: 18,
      zIndex: 2,
    },
  }),
  {className: 'checkBox-text'},
);

const Checkbox = ({
  checked,
  disabled,
  onChange,
  style,
  text,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checkedValue: boolean) => void;
  style?: React.CSSProperties;
  text: JSX.Element | string;
}) => {
  return (
    <WrapperLabel style={style}>
      <InvisibleCheckbox
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
      />
      <Text $disabled={disabled}>{text}</Text>
    </WrapperLabel>
  );
};

export default Checkbox;
