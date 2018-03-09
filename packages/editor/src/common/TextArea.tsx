import * as React from 'react';

import styled from '@pinecast/sb-styles';

const TextAreaInput = styled('textarea', {
  appearance: 'none',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: 4,
  boxShadow: '0 0 0 0 #c9d9e0',
  display: 'flex',
  flex: '0 0 100%',
  fontSize: 14,
  height: 150,
  margin: '8px 0 20px',
  padding: '8px',
  transition: 'box-shadow 0.2s',
  width: '100%',

  ':focus': {
    boxShadow: '0 0 0 3px #c9d9e0',
    outline: 'none',
  },
});

export default class TextArea extends React.PureComponent {
  props: {
    onChange: (value: string) => void;
    style?: React.CSSProperties;
    value: string;
  };

  handleChange = e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onChange(e.target.value);
  };

  render() {
    const {onChange: _, value, ...rest} = this.props;
    return (
      <TextAreaInput {...rest} onChange={this.handleChange} value={value} />
    );
  }
}
