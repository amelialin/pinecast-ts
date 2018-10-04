import * as React from 'react';

import {CommonProps} from '@pinecast/common/icons/types';
import styled, {CSS} from '@pinecast/styles';

const sizes = {
  normal: 30,
  small: 24,
  large: 36,
};

const NativeButton = styled(
  'button',
  ({
    disabled,
    $isBlock,
    $size,
    $style,
  }: {
    disabled?: boolean;
    $isBlock?: boolean;
    $size: 'normal' | 'large' | 'small';
    $style?: CSS;
  }) => ({
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 0 0 transparent inset',
    cursor: 'pointer',
    display: $isBlock ? 'flex' : 'inline-flex',
    height: sizes[$size],
    justifyContent: 'center',
    margin: $isBlock ? '0 0 20px' : 0,
    minWidth: 20,
    opacity: disabled ? 0.5 : 1,
    padding: '0 4px',
    pointerEvents: disabled ? 'none' : undefined,
    transition: 'background-color 0.2s, box-shadow 0.2s, opacity 0.2s',

    ...$style,

    ':hover': {
      boxShadow: '0 0 0 transparent inset',
    },
    ':active': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      boxShadow: '0 0 0 transparent inset',
    },
    ':focus': {
      boxShadow: 'rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
      outline: 'none',
    },
  }),
  {className: 'IconButton-nativeButton'},
);

const IconButton = ({
  className,
  Component,
  iconProps,
  onClick,
  size = 'normal',
  style,
  ...rest
}: {
  className?: string;
  Component: React.ComponentType<CommonProps>;
  disabled?: boolean;
  iconProps?: Partial<CommonProps>;
  $isBlock?: boolean;
  onClick: () => void;
  size?: 'normal' | 'small' | 'large';
  style?: CSS;
}) => (
  <NativeButton
    className={className}
    $size={size}
    $style={style}
    onClick={e => {
      e.preventDefault();
      onClick();
    }}
    type="button"
    {...rest}
  >
    <Component {...iconProps} />
  </NativeButton>
);

export default IconButton;
