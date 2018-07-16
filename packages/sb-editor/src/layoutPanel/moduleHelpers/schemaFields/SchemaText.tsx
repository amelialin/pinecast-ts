import * as React from 'react';

import Label from '@pinecast/common/Label';
import TextInput from '@pinecast/common/TextInput';

import {TextProps} from './types';

export default class SchemaText extends React.PureComponent {
  props: TextProps;

  handleChange = (newValue: string) => {
    if (this.props.type !== 'text') {
      throw new Error('unreachable');
    }
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    if (this.props.type !== 'text') {
      throw new Error('unreachable');
    }
    return (
      <Label subText={this.props.description} text={this.props.name}>
        <TextInput
          onChange={this.handleChange}
          tabIndex={this.props.open ? 0 : -1}
          value={this.props.value}
        />
      </Label>
    );
  }
}
