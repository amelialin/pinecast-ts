import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

export type Sizes = 'normal' | 'large';

const InputWrapper = styled(
  'div',
  ({$disabled, $size = 'normal'}: {$disabled: boolean; $size?: Sizes}) => ({
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    display: 'flex',
    height: $size === 'normal' ? 32 : 40,
    margin: 0,
  }),
);
const Input = styled(
  'input',
  ({$invalid, $size = 'normal'}: {$invalid: boolean; $size?: Sizes}) => ({
    background: 'transparent',
    border: 0,
    borderRadius: 4,
    boxShadow: $invalid
      ? '0 0 0 1px #EF6B6B, 0 0 0 0 #c9d9e0'
      : '0 0 0 1px #c6caca, 0 0 0 0 #c9d9e0',
    color: '#44484d',
    flex: '1 1',
    fontFamily: DEFAULT_FONT,
    fontSize: $size === 'normal' ? 14 : 20,
    height: '100%',
    padding: '0 10px',
    position: 'relative',
    transition: 'box-shadow 0.2s, opacity 0.2s',
    width: '100%',
    zIndex: 2,

    ':focus': {
      boxShadow: $invalid
        ? '0 0 0 1px #EF6B6B, 0 0 0 4px #FEDEDE'
        : '0 0 0 1px #9eb4c0, 0 0 0 4px #c9d9e0',
      outline: 'none',
    },

    ':nth-child(2)': {
      borderBottomLeftRadius: '0',
      borderTopLeftRadius: '0',
    },
    ':not(:last-child)': {
      borderBottomRightRadius: '0',
      borderTopRightRadius: '0',
    },

    ':disabled': {
      opacity: 0.5,
    },

    '::placeholder': {color: '#c6caca'},
    '::-webkit-placeholder': {color: '#c6caca'},
  }),
  {className: 'TextInput'},
);

const Prefix = styled(
  'span',
  ({
    $disabled,
    $invalid,
    $size,
  }: {
    $disabled: boolean;
    $invalid: boolean;
    $size: Sizes;
  }) => ({
    background: 'transparent',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    boxShadow: $invalid ? '0 0 0 1px #EF6B6B' : '0 0 0 1px #c6caca',
    color: '#333',
    flex: '0 0',
    fontSize: $size === 'normal' ? 14 : 20,
    height: '100%',
    lineHeight: '32px',
    marginRight: 1,
    padding: '0 8px',
    ':not(:empty) + input': {
      marginLeft: 0,
    },
  }),
);
const Suffix = styled(
  'span',
  ({
    $disabled,
    $invalid,
    $size,
  }: {
    $disabled: boolean;
    $invalid: boolean;
    $size: Sizes;
  }) => ({
    background: 'transparent',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    boxShadow: $invalid ? '0 0 0 1px #EF6B6B' : '0 0 0 1px #c6caca',
    color: '#333',
    flex: '0 0',
    fontSize: $size === 'normal' ? 14 : 20,
    height: '100%',
    lineHeight: '32px',
    marginLeft: 1,
    opacity: $disabled ? 0.5 : 1,
    padding: '0 8px',
    transition: 'box-shadow 0.2s, opacity 0.2s',
  }),
);

export interface Props {
  autoFocus?: boolean;
  disabled?: boolean;
  inputStyle?: CSS;
  invalid?: boolean;
  maxLength?: number;
  minlength?: number;
  name?: string;
  onChange: (value: string) => void;
  pattern?: string;
  placeholder?: string;
  prefix?: JSX.Element | string;
  required?: boolean;
  size?: Sizes;
  style?: React.CSSProperties;
  suffix?: JSX.Element | string;
  tabIndex?: number;
  type?: 'email' | 'text' | 'url';
  value: string;
}

export default class TextInput extends React.PureComponent {
  props: Props;

  static defaultProps = {
    size: 'normal',
    type: 'text',
  };

  handleChange = e => {
    const value = e.target.value;
    const {maxLength} = this.props;
    if (maxLength && value.length > maxLength) {
      this.props.onChange(value.substr(0, maxLength));
    } else {
      this.props.onChange(value);
    }
  };

  render() {
    const {
      inputStyle,
      invalid,
      onChange,
      prefix,
      size,
      style,
      suffix,
      value,
      ...rest
    } = this.props;
    return (
      <InputWrapper
        $disabled={rest.disabled || false}
        $size={size}
        style={style}
      >
        {prefix && (
          <Prefix
            $disabled={rest.disabled || false}
            $invalid={invalid || false}
            $size={size || 'normal'}
          >
            {prefix}
          </Prefix>
        )}
        <Input
          $invalid={invalid || false}
          $size={size}
          style={inputStyle}
          {...rest}
          onChange={this.handleChange}
          value={value}
        />
        {suffix && (
          <Suffix
            $disabled={rest.disabled || false}
            $invalid={invalid || false}
            $size={size || 'normal'}
          >
            {suffix}
          </Suffix>
        )}
      </InputWrapper>
    );
  }
}
