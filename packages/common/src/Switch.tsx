import * as React from 'react';

import styled from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const WrapperLabel = styled(
  'label',
  {
    alignItems: 'center',
    display: 'flex',
    padding: '0 0 20px',

    ':not(:empty) + .Switch--WrapperLabel': {
      marginTop: -12,
    },
  },
  {className: 'Switch--WrapperLabel'},
);
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

    ':checked + .Switch--text::after': {
      left: 9,
    },

    ':focus': {
      outline: 'none',
    },
    ':focus + .Switch--text::before': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 2px #c9d9e0',
    },
  },
  {type: 'checkbox'},
);

const Text = styled(
  'div',
  ({
    $checked,
    $disabled,
    $onColor,
  }: {
    $checked: boolean;
    $disabled: boolean;
    $onColor: string;
  }) => ({
    display: 'flex',
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    fontWeight: 500,
    flex: '1 1',
    opacity: $disabled ? 0.5 : 1,
    paddingLeft: 36,
    position: 'relative',
    transition: 'opacity 0.2s',

    '::before': {
      backgroundColor: $checked ? $onColor : '#dee1df',
      borderRadius: 12,
      bottom: 0,
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 transparent',
      content: '""',
      height: 20,
      left: 0,
      margin: 'auto',
      position: 'absolute',
      top: 0,
      transition: 'background-color 0.2s, box-shadow 0.2s',
      width: 28,
      zIndex: 1,
    },
    '::after': {
      backgroundColor: '#fff',
      borderRadius: 12,
      bottom: 0,
      boxShadow: '0 0 0 0.5px rgba(0, 0, 0, .15)',
      content: '""',
      height: 18,
      left: 1,
      margin: 'auto',
      position: 'absolute',
      top: 0,
      transition: 'left 0.2s',
      width: 18,
      zIndex: 2,
    },
  }),
  {className: 'Switch--text'},
);

const OffText = styled('div', {
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  fontWeight: 500,
  marginRight: 8,
});

const Switch = ({
  activeColor = '#51D197',
  checked,
  disabled,
  offText,
  onChange,
  style,
  tabIndex,
  text,
}: {
  activeColor?: string;
  checked: boolean;
  disabled?: boolean;
  offText?: React.ReactNode;
  onChange: (checkedValue: boolean) => void;
  style?: React.CSSProperties;
  tabIndex?: number;
  text: React.ReactNode;
}) => {
  return (
    <WrapperLabel style={style}>
      {offText && <OffText>{offText}</OffText>}
      <InvisibleCheckbox
        checked={checked || false}
        disabled={disabled || false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
        tabIndex={tabIndex}
      />
      <Text
        $checked={checked || false}
        $disabled={disabled || false}
        $onColor={activeColor}
      >
        {text}
      </Text>
    </WrapperLabel>
  );
};

export default Switch;
