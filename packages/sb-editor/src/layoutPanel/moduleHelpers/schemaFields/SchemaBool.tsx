import * as React from 'react';

import Checkbox from '@pinecast/common/Checkbox';

import {SchemaProps} from './types';

export default class SchemaBool extends React.PureComponent {
  props: SchemaProps;

  handleChange = (newValue: boolean) => {
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    return (
      <Checkbox
        checked={this.props.value}
        onChange={this.handleChange}
        tabIndex={this.props.open ? 0 : -1}
        text={this.props.name}
      />
    );
  }
}
