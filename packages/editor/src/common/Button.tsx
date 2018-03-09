import * as React from 'react';

import styled, {CSS} from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';
import KeyboardShortcut, {ShortcutKey} from './KeyboardShortcut';
import Spinner from './Spinner';

const NativeButton = styled(
  'button',
  ({
    disabled,
    $isBlock,
    $isPrimary,
    $pending,
    $size,
  }: {
    disabled?: boolean;
    $isBlock?: boolean;
    $isPrimary?: boolean;
    $pending?: boolean;
    $size: 'normal' | 'large' | 'small';
  }) => ({
    backgroundColor: $isPrimary ? '#8d52d1' : '#fff',
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15), 0 0 0 transparent inset',
    color: $isPrimary ? '#fff' : '#000',
    display: $isBlock ? 'flex' : 'inline-flex',
    fontFamily: DEFAULT_FONT,
    fontSize: $size === 'normal' ? 13 : $size === 'small' ? 12 : 16,
    fontWeight: 500,
    height: $size === 'normal' ? 30 : $size === 'small' ? 24 : 36,
    margin: $isBlock ? '0 0 20px' : 0,
    opacity: $pending || disabled ? 0.5 : 1,
    padding:
      $size === 'normal' ? '0 16px' : $size === 'small' ? '0 12px' : '0 20px',
    pointerEvents: $pending || disabled ? 'none' : null,
    transition: 'box-shadow 0.2s, opacity 0.2s',

    ':hover': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15), 0 0 0 transparent inset',
    },
    ':active': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15), 0 0 0 transparent inset',
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
  {className: 'Button-nativeButton'},
);

const Button = ({
  children,
  className,
  pending,
  shortcut,
  size = 'normal',
  style,
  ...rest
}: {
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  className?: string;
  disabled?: boolean;
  $isBlock?: boolean;
  $isPrimary?: boolean;
  pending?: boolean;
  shortcut?: ShortcutKey;
  size?: 'normal' | 'small' | 'large';
  style?: CSS;
  [key: string]: any;
}) => (
  <NativeButton
    className={className}
    $pending={pending}
    $size={size}
    {...rest}
    style={style}
    type={rest.type || 'button'}
  >
    {pending ? <Spinner type="subtle" /> : children}
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

export const ButtonGroup = ({
  children,
  style,
}: {
  children: Array<JSX.Element | false | null>;
  style?: React.CSSProperties;
}) => {
  return (
    <React.Fragment>
      {React.Children.map(children.filter(x => x), (child: any, i) => {
        if (!i) {
          return React.cloneElement(child, {style});
        }
        return React.cloneElement(child, {style: {...style, marginLeft: 8}});
      })}
    </React.Fragment>
  );
};
