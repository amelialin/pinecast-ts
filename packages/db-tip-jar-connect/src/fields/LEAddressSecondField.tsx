import * as React from 'react';

import TextInput from '@pinecast/common/TextInput';

import Input from './Input';

export default class LEAddressSecondField extends React.Component {
  props: {
    onChange: (value: string) => void;
    value: string;
  };
  render() {
    return (
      <Input
        onChange={this.props.onChange}
        validation={() => null}
        value={this.props.value}
      >
        {({onBlur, onChange, valid, value}) => (
          <TextInput
            invalid={!valid}
            nativeEvents={{onBlur}}
            onChange={onChange}
            required={true}
            style={{marginBottom: 8, width: 250}}
            value={value}
          />
        )}
      </Input>
    );
  }
}
