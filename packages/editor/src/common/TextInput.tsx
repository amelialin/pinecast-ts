import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from '../common/constants';

const InputWrapper = styled('div', ({$disabled}: {$disabled: boolean}) => ({
  alignItems: 'center',
  backgroundColor: '#fff',
  border: $disabled ? '1px solid #eee' : '1px solid #ccc',
  borderRadius: 4,
  display: 'flex',
  height: 35,
  margin: '8px 0 20px',
}));
const Input = styled('input', {
  appearance: 'none',
  background: 'transparent',
  border: 0,
  borderRadius: 4,
  boxShadow: '0 0 0 0 #c9d9e0',
  flex: '1 1',
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  height: '100%',
  padding: '0 10px',
  transition: 'box-shadow 0.2s',

  ':focus': {
    boxShadow: '0 0 0 3px #c9d9e0',
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
});

const Prefix = styled('span', {
  background: 'transparent',
  borderRight: '1px solid #ccc',
  color: '#333',
  flex: '0 0',
  height: '100%',
  lineHeight: '35px',
  padding: '0 8px',
});
const Suffix = styled('span', {
  background: 'transparent',
  borderLeft: '1px solid #ccc',
  color: '#333',
  flex: '0 0',
  height: '100%',
  lineHeight: '35px',
  padding: '0 8px',
});

export interface Props {
  disabled?: boolean;
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
    const {onChange: _, prefix, style, suffix, value, ...rest} = this.props;
    return (
      <InputWrapper $disabled={rest.disabled} style={style}>
        {prefix && <Prefix>{prefix}</Prefix>}
        <Input {...rest} onChange={this.handleChange} value={value} />
        {suffix && <Suffix>{suffix}</Suffix>}
      </InputWrapper>
    );
  }
}
