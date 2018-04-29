import * as React from 'react';

import styled from '@pinecast/styles';

const TextAreaInput = styled(
  'textarea',
  ({$invalid, disabled}: {$invalid?: boolean; disabled?: boolean}) => ({
    appearance: 'none',
    backgroundColor: '#fff',
    boxShadow: $invalid
      ? '0 0 0 1px #EF6B6B, 0 0 0 0 #c9d9e0'
      : '0 0 0 1px #c6caca, 0 0 0 0 #c9d9e0',
    border: 0,
    borderRadius: 4,
    display: 'flex',
    flex: '0 0 100%',
    fontSize: 14,
    height: 150,
    lineHeight: '20px',
    opacity: disabled ? 0.5 : 1,
    padding: '8px',
    transition: 'box-shadow 0.2s, opacity 0.2s',
    width: '100%',

    ':focus': {
      boxShadow: $invalid
        ? '0 0 0 1px #EF6B6B, 0 0 0 4px #FEDEDE'
        : '0 0 0 1px #9eb4c0, 0 0 0 4px #c9d9e0',
      outline: 'none',
    },
  }),
  {className: 'TextArea'},
);

export default class TextArea extends React.PureComponent {
  props: {
    disabled?: boolean;
    invalid?: boolean;
    maxLength?: number;
    minLength?: number;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    style?: React.CSSProperties;
    tabIndex?: number;
    value: string;
  };

  handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onChange((e.target as HTMLTextAreaElement).value);
  };

  render() {
    const {invalid, onChange, value, ...rest} = this.props;
    void onChange;

    return (
      <TextAreaInput
        $invalid={invalid}
        {...rest}
        onChange={this.handleChange}
        value={value}
      />
    );
  }
}
