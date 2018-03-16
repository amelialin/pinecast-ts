import * as React from 'react';

import Label from '../../../common/Label';
import {SchemaProps} from './types';
import Select from '../../../common/Select';

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
          tabIndex={this.props.open ? 0 : -1}
          value={this.props.value}
        />
      </Label>
    );
  }
}
