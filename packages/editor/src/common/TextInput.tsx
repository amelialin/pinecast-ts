import * as React from 'react';

import styled from '@pinecast/sb-styles';

const InputWrapper = styled('div', {
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: 4,
  display: 'flex',
  height: 35,
  margin: '10px 0 20px',

  ':focus': {
    border: '1px solid #999',
  },
});
const Input = styled('input', {
  appearance: 'none',
  background: 'transparent',
  border: 0,
  flex: '0 0 100%',
  fontSize: 14,
  height: '100%',
  padding: '0 10px',
});

export default class TextInput extends React.PureComponent {
  props: {
    onChange: (value: string) => void;
    pattern?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    type?: 'text' | 'url';
    value: string;
  };

  static defaultProps = {
    type: 'text',
  };

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const {onChange: _, style, value, ...rest} = this.props;
    return (
      <InputWrapper style={style}>
        <Input {...rest} onChange={this.handleChange} value={value} />
      </InputWrapper>
    );
  }
}
