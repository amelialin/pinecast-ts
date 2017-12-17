import * as React from 'react';

import styled from '@pinecast/sb-styles';

import KeyboardShortcut, {ShortcutKey} from './KeyboardShortcut';

const NativeButton = styled(
  'button',
  ({disabled, isPrimary}: {disabled?: boolean; isPrimary?: boolean}) => ({
    backgroundColor: isPrimary ? '#8d52d1' : '#fff',
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15)',
    color: isPrimary ? '#fff' : '#000',
    display: 'inline-flex',
    fontFamily: 'Fira Mono',
    fontSize: 13,
    fontWeight: 500,
    height: 30,
    opacity: disabled ? 0.5 : 1,
    padding: '0 15px',
    pointerEvents: disabled ? 'none' : null,
    transition: 'box-shadow 0.2s, opacity 0.2s',

    ':hover': {
      boxShadow:
        '0 3px 7px rgba(0, 0, 0, 0.2), 0 8px 17px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15)',
    },
    ':active': {
      boxShadow:
        '0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 17px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(60, 60, 60, 0.15)',
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
  isPrimary?: boolean;
  shortcut?: ShortcutKey;
  style?: React.CSSProperties;
  [key: string]: any;
}) => (
  <NativeButton {...rest} style={style}>
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
