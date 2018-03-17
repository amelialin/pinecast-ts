import * as React from 'react';

import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';

import {SchemaProps} from './types';

export default class SchemaEnum extends React.PureComponent {
  props: SchemaProps & {options: {[value: string]: string}};

  handleChange = (newValue: string) => {
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    return (
      <Label text={this.props.name}>
        <Select
          onChange={this.handleChange}
          options={this.props.options}
          style={{display: 'inline-flex'}}
          tabIndex={this.props.open ? 0 : -1}
          value={this.props.value}
        />
      </Label>
    );
  }
}
