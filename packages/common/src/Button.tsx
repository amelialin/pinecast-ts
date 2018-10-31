import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {Children} from './types';
import {DEFAULT_FONT} from './constants';
import Group from './Group';
import KeyboardShortcut, {ShortcutKey} from './KeyboardShortcut';
import Spinner from './Spinner';

const spinnerStyle: React.CSSProperties = {
  bottom: 0,
  left: 0,
  margin: 'auto',
  position: 'absolute',
  right: 0,
  top: 0,
};

const NativeButton = styled(
  'button',
  ({
    disabled,
    $isBlock,
    $isPrimary,
    $pending,
    $size = 'normal',
  }: {
    disabled?: boolean;
    $isBlock?: boolean;
    $isPrimary?: boolean;
    $pending?: boolean;
    $size?: 'normal' | 'large' | 'small';
  }) => ({
    backgroundColor: $isPrimary ? '#8d52d1' : '#fff',
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 0.5px #c6caca, 0 0 0 transparent inset',
    color: $pending ? 'transparent' : $isPrimary ? '#fff' : '#000',
    cursor: 'pointer',
    display: $isBlock ? 'flex' : 'inline-flex',
    fontFamily: DEFAULT_FONT,
    fontSize: $size === 'normal' ? 13 : $size === 'small' ? 12 : 16,
    fontWeight: 500,
    height: $size === 'normal' ? 30 : $size === 'small' ? 24 : 36,
    lineHeight: $size === 'normal' ? 30 : $size === 'small' ? 24 : 36,
    margin: $isBlock ? '0 0 20px' : 0,
    opacity: $pending || disabled ? 0.5 : 1,
    padding:
      $size === 'normal' ? '0 16px' : $size === 'small' ? '0 12px' : '0 20px',
    pointerEvents: $pending || disabled ? 'none' : undefined,
    position: 'relative',
    transition: 'box-shadow 0.2s, color 0.2s, opacity 0.2s',
    userSelect: 'none',

    ':hover': {
      boxShadow:
        '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), 0 0 0 0.5px #c6caca, 0 0 0 transparent inset',
    },
    ':active': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px #c6caca, 0 0 0 transparent inset',
    },

    ':focus': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 0.5px #8aa3b1, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
      outline: 'none',
    },
    ':hover:focus': {
      boxShadow:
        '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), 0 0 0 0.5px #8aa3b1, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
      outline: 'none',
    },
    ':active:focus': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px #8aa3b1, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
    },
  }),
  {className: 'Button-nativeButton'},
);

export default class Button extends React.PureComponent {
  props: {
    autoFocus?: boolean;
    children: Children;
    className?: string;
    disabled?: boolean;
    href?: string;
    $isBlock?: boolean;
    $isPrimary?: boolean;
    onClick?: () => void;
    onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    pending?: boolean;
    shortcut?: ShortcutKey;
    size?: 'normal' | 'small' | 'large';
    style?: CSS;
    tabIndex?: number;
    title?: string;
    type?: 'submit' | 'button';
  };

  static defaultProps = {size: 'normal', type: 'button'};

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.props.href) {
      e.preventDefault();
      window.location.href = this.props.href;
    }
    if (this.props.onClick) {
      e.preventDefault();
      this.props.onClick();
    }
  };

  render() {
    const {
      $isBlock,
      $isPrimary,
      autoFocus,
      children,
      className,
      disabled,
      onMouseDown,
      onMouseUp,
      pending,
      shortcut,
      size,
      style,
      tabIndex,
      title,
      type,
    } = this.props;

    return (
      <NativeButton
        $isPrimary={$isPrimary || false}
        $isBlock={$isBlock || false}
        autoFocus={autoFocus}
        className={className}
        disabled={disabled || false}
        $pending={pending}
        $size={size}
        onClick={this.handleClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={style}
        tabIndex={tabIndex}
        title={title}
        type={type}
      >
        {pending && (
          <Spinner
            style={spinnerStyle}
            type={$isPrimary ? 'subtle' : 'focus'}
          />
        )}
        {children}
        {shortcut ? (
          <KeyboardShortcut
            {...shortcut}
            style={{
              alignSelf: 'flex-end',
              fontWeight: 400,
              marginLeft: 4,
              opacity: 0.5,
              marginBottom: size === 'large' ? 2 : 1,
            }}
          />
        ) : null}
      </NativeButton>
    );
  }
}

export const ButtonGroup = ({
  children,
  style,
  wrapperStyle,
}: {
  children: Children;
  style?: CSS;
  wrapperStyle?: CSS;
}) => (
  <Group spacing={8} style={style} wrapperStyle={wrapperStyle}>
    {children}
  </Group>
);
