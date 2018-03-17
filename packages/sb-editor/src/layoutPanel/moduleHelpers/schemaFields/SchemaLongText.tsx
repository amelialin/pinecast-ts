import * as React from 'react';

import Label from '@pinecast/common/Label';
import TextArea from '@pinecast/common/TextArea';

import {SchemaProps} from './types';

export default class SchemaText extends React.PureComponent {
  props: SchemaProps;

  handleChange = (newValue: string) => {
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    return (
      <Label text={this.props.name}>
        <TextArea
          onChange={this.handleChange}
          tabIndex={this.props.open ? 0 : -1}
          value={this.props.value}
        />
      </Label>
    );
  }
}
