import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

export type Sizes = 'normal' | 'large';

export const InputWrapper = styled(
  'div',
  ({
    $disabled,
    $hasPrefix,
    $size = 'normal',
  }: {
    $disabled?: boolean;
    $hasPrefix?: boolean;
    $size?: Sizes;
  }) => ({
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    display: ['flex', 'grid'],
    gridTemplateColumns: $hasPrefix
      ? 'max-content 1fr max-content'
      : '1fr max-content',
    height: $size === 'normal' ? 32 : 40,
    lineHeight: $size === 'normal' ? '32px' : '40px',
    margin: 0,
  }),
);
const Input = styled(
  'input',
  ({
    $hasPrefix,
    $invalid,
    $size = 'normal',
  }: {
    $hasPrefix: boolean;
    $invalid: boolean;
    $size?: Sizes;
  }) => ({
    background: 'transparent',
    border: 0,
    borderRadius: 4,
    borderBottomLeftRadius: $hasPrefix ? 0 : undefined,
    borderTopLeftRadius: $hasPrefix ? 0 : undefined,
    boxShadow: $invalid
      ? '0 0 0 1px #EF6B6B, 0 0 0 0 #c9d9e0'
      : '0 0 0 1px #c6caca, 0 0 0 0 #c9d9e0',
    color: '#44484d',
    flex: '1 1',
    fontFamily: DEFAULT_FONT,
    fontSize: $size === 'normal' ? 14 : 20,
    gridColumn: $hasPrefix ? '2 / 2' : '1 / 1',
    gridRow: '1 / 1',
    height: '100%',
    maxWidth: '100%',
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

    ':not(:last-child)': {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
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
    gridColumn: '1 / 1',
    gridRow: '1 / 1',
    height: '100%',
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
    $hasPrefix,
    $invalid,
    $size,
  }: {
    $disabled: boolean;
    $hasPrefix: boolean;
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
    gridColumn: $hasPrefix ? '3 / 3' : '2 / 2',
    gridRow: '1 / 1',
    height: '100%',
    marginLeft: 1,
    opacity: $disabled ? 0.5 : 1,
    padding: '0 8px',
    transition: 'box-shadow 0.2s, opacity 0.2s',
  }),
);

export interface Props {
  autoFocus?: boolean;
  disabled?: boolean;
  endCapStyle?: CSS;
  inputStyle?: CSS;
  invalid?: boolean;
  maxLength?: number;
  minlength?: number;
  name?: string;
  nativeEvents?: Partial<{
    onBlur: React.HTMLAttributes<HTMLInputElement>['onBlur'];
    onChange: React.HTMLAttributes<HTMLInputElement>['onChange'];
    onClick: React.HTMLAttributes<HTMLInputElement>['onClick'];
    onFocus: React.HTMLAttributes<HTMLInputElement>['onFocus'];
    onKeyDown: React.HTMLAttributes<HTMLInputElement>['onKeyDown'];
    onKeyUp: React.HTMLAttributes<HTMLInputElement>['onKeyUp'];
    onKeyPress: React.HTMLAttributes<HTMLInputElement>['onKeyPress'];
  }>;
  onChange?: (value: string) => void;
  pattern?: string;
  placeholder?: string;
  prefix?: JSX.Element | string;
  readOnly?: boolean;
  required?: boolean;
  size?: Sizes;
  style?: React.CSSProperties;
  suffix?: JSX.Element | string;
  tabIndex?: number;
  type?: 'email' | 'text' | 'url' | 'password';
  value: string;
}

export default class TextInput extends React.PureComponent {
  props: Props;

  static defaultProps = {
    size: 'normal',
    type: 'text',
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!this.props.onChange) {
      return;
    }
    const value = (e.target as HTMLInputElement).value;
    const {maxLength} = this.props;
    if (maxLength && value.length > maxLength) {
      this.props.onChange(value.substr(0, maxLength));
    } else {
      this.props.onChange(value);
    }
  };

  render() {
    const {
      endCapStyle,
      inputStyle,
      invalid,
      onChange,
      nativeEvents,
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
        $hasPrefix={Boolean(prefix)}
        $size={size}
        style={style}
      >
        {prefix && (
          <Prefix
            $disabled={rest.disabled || false}
            $invalid={invalid || false}
            $size={size || 'normal'}
            style={endCapStyle}
          >
            {prefix}
          </Prefix>
        )}
        <Input
          $hasPrefix={Boolean(prefix)}
          $invalid={invalid || false}
          $size={size}
          style={inputStyle}
          {...rest}
          onChange={this.handleChange}
          {...nativeEvents}
          value={value}
        />
        {suffix && (
          <Suffix
            $disabled={rest.disabled || false}
            $hasPrefix={Boolean(prefix)}
            $invalid={invalid || false}
            $size={size || 'normal'}
            style={endCapStyle}
          >
            {suffix}
          </Suffix>
        )}
      </InputWrapper>
    );
  }
}
