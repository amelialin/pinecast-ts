import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const WrapperLabel = styled(
  'label',
  {
    display: 'flex',
    padding: '0 0 20px',

    ':not(:empty) + .Radio--WrapperLabel': {
      marginTop: -12,
    },
  },
  {className: 'Radio--WrapperLabel'},
);
const InvisibleRadio = styled(
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

    ':focus': {
      outline: 'none',
    },
    ':focus + .Radio-text::before': {
      boxShadow:
        'inset 0 0 0 1px #b0b5b5, inset 0 0 0 0 #708d9e, 0 0 0 2px #c9d9e0',
    },
    ':checked + .Radio-text::before': {
      boxShadow:
        'inset 0 0 0 0 #b0b5b5, inset 0 0 0 5px #708d9e, 0 0 0 0 #c9d9e0',
    },
    ':checked:focus + .Radio-text::before': {
      boxShadow:
        'inset 0 0 0 0 #b0b5b5, inset 0 0 0 5px #708d9e, 0 0 0 2px #c9d9e0',
    },
  },
  {type: 'radio'},
);

const Text = styled(
  'div',
  ({
    $alignInput,
    $disabled,
  }: {
    $alignInput: 'top' | 'center';
    $disabled: boolean;
  }) => ({
    display: 'flex',
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    fontWeight: 500,
    flex: '1 1',
    opacity: $disabled ? 0.5 : 1,
    paddingLeft: 24,
    position: 'relative',
    transition: 'opacity 0.2s',

    '::before': {
      background: '#fff',
      borderRadius: '100%',
      bottom: 0,
      boxShadow:
        'inset 0 0 0 1px #b0b5b5, inset 0 0 0 0 #708d9e, 0 0 0 0 #c9d9e0',
      content: '""',
      height: 16,
      left: 0,
      margin: $alignInput === 'top' ? '0 auto auto' : 'auto',
      position: 'absolute',
      top: 0,
      transition: 'box-shadow 0.2s',
      width: 16,
      zIndex: 1,
    },
  }),
  {className: 'Radio-text'},
);

const Radio = ({
  alignInput = 'center',
  checked,
  disabled,
  name,
  onChange,
  style,
  tabIndex,
  text,
}: {
  alignInput?: 'top' | 'center';
  checked: boolean;
  disabled?: boolean;
  name: string;
  onChange: (checkedValue: boolean) => void;
  style?: CSS;
  tabIndex?: number;
  text: JSX.Element | string;
}) => {
  return (
    <WrapperLabel style={style}>
      <InvisibleRadio
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
        tabIndex={tabIndex}
      />
      <Text $alignInput={alignInput} $disabled={disabled || false}>
        {text}
      </Text>
    </WrapperLabel>
  );
};

export default Radio;
