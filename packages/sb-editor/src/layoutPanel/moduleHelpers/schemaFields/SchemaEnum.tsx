import * as React from 'react';

import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';

import {EnumProps} from './types';

export default class SchemaEnum extends React.PureComponent {
  props: EnumProps;

  handleChange = (newValue: string) => {
    if (this.props.type !== 'enum') {
      throw new Error('unreachable');
    }
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    if (this.props.type !== 'enum') {
      throw new Error('unreachable');
    }
    return (
      <Label subText={this.props.description} text={this.props.name}>
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
