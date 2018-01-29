import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';
import KeyboardShortcut, {ShortcutKey} from './KeyboardShortcut';

const NativeButton = styled(
  'button',
  ({disabled, $isPrimary}: {disabled?: boolean; $isPrimary?: boolean}) => ({
    backgroundColor: $isPrimary ? '#8d52d1' : '#fff',
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15), 0 0 0 transparent',
    color: $isPrimary ? '#fff' : '#000',
    display: 'inline-flex',
    fontFamily: DEFAULT_FONT,
    fontSize: 13,
    fontWeight: 500,
    height: 30,
    opacity: disabled ? 0.5 : 1,
    padding: '0 15px',
    pointerEvents: disabled ? 'none' : null,
    transition: 'box-shadow 0.2s, opacity 0.2s',

    ':hover': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15), 0 0 0 transparent',
    },
    ':active': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15), 0 0 0 transparent',
    },

    ':focus': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15), rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
      outline: 'none',
    },
    ':active:focus': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15), rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
    },
  }),
);

const Button = ({
  children,
  shortcut,
  style,
  ...rest,
}: {
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  disabled?: boolean;
  $isPrimary?: boolean;
  shortcut?: ShortcutKey;
  style?: React.CSSProperties;
  [key: string]: any;
}) => (
  <NativeButton {...rest} style={style} type={rest.type || 'button'}>
    {children}
    {shortcut ? (
      <KeyboardShortcut
        {...shortcut}
        style={{
          alignSelf: 'flex-end',
          fontWeight: 400,
          marginBottom: 1,
          marginLeft: 4,
          opacity: 0.5,
        }}
      />
    ) : null}
  </NativeButton>
);

export default Button;

export const ButtonGroup = ({children}: {children: Array<JSX.Element>}) => {
  return (
    <React.Fragment>
      {React.Children.map(children, (child: any, i) => {
        if (!i) {
          return child;
        }
        return React.cloneElement(child, {style: {marginLeft: 8}});
      })}
    </React.Fragment>
  );
};
