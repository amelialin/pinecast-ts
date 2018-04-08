import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const InputWrapper = styled('div', ({$disabled}: {$disabled: boolean}) => ({
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 4,
  display: 'flex',
  height: 32,
  margin: '8px 0 20px',
}));
const Input = styled('input', ({$invalid}: {$invalid: boolean}) => ({
  background: 'transparent',
  border: 0,
  borderRadius: 4,
  boxShadow: $invalid
    ? '0 0 0 1px #EF6B6B, 0 0 0 0 #c9d9e0'
    : '0 0 0 1px #c6caca, 0 0 0 0 #c9d9e0',
  color: '#44484d',
  flex: '1 1',
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  height: '100%',
  padding: '0 10px',
  transition: 'box-shadow 0.2s, opacity 0.2s',
  width: '100%',

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
}));

const Prefix = styled(
  'span',
  ({$disabled, $invalid}: {$disabled: boolean; $invalid: boolean}) => ({
    background: 'transparent',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderRight: '1px solid #c6caca',
    boxShadow: $invalid ? '0 0 0 1px #EF6B6B' : '0 0 0 1px #c6caca',
    color: '#333',
    flex: '0 0',
    fontSize: 14,
    height: '100%',
    lineHeight: '32px',
    padding: '0 8px',
    ':not(:empty) + input': {
      marginLeft: 0,
    },
  }),
);
const Suffix = styled(
  'span',
  ({$disabled, $invalid}: {$disabled: boolean; $invalid: boolean}) => ({
    background: 'transparent',
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    boxShadow: $invalid ? '0 0 0 1px #EF6B6B' : '0 0 0 1px #c6caca',
    color: '#333',
    flex: '0 0',
    fontSize: 14,
    height: '100%',
    lineHeight: '32px',
    marginLeft: 1,
    opacity: $disabled ? 0.5 : 1,
    padding: '0 8px',
    transition: 'box-shadow 0.2s, opacity 0.2s',
  }),
);

export interface Props {
  disabled?: boolean;
  inputStyle?: CSS;
  invalid?: boolean;
  maxLength?: number;
  minlength?: number;
  onChange: (value: string) => void;
  pattern?: string;
  placeholder?: string;
  prefix?: JSX.Element | string;
  required?: boolean;
  style?: React.CSSProperties;
  suffix?: JSX.Element | string;
  tabIndex?: number;
  type?: 'email' | 'text' | 'url';
  value: string;
}

export default class TextInput extends React.PureComponent {
  props: Props;

  static defaultProps = {
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
      style,
      suffix,
      value,
      ...rest
    } = this.props;
    return (
      <InputWrapper $disabled={rest.disabled} style={style}>
        {prefix && (
          <Prefix $disabled={rest.disabled} $invalid={invalid}>
            {prefix}
          </Prefix>
        )}
        <Input
          $invalid={invalid || false}
          style={inputStyle}
          {...rest}
          onChange={this.handleChange}
          value={value}
        />
        {suffix && (
          <Suffix $disabled={rest.disabled} $invalid={invalid}>
            {suffix}
          </Suffix>
        )}
      </InputWrapper>
    );
  }
}
