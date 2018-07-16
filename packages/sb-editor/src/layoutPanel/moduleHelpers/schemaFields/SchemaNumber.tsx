import * as React from 'react';

import Label from '@pinecast/common/Label';
import NumberInput from '@pinecast/common/NumberInput';

import {NumberProps} from './types';

export default class SchemaNumber extends React.PureComponent {
  props: NumberProps;

  handleChange = (newValue: number) => {
    if (this.props.type !== 'number') {
      throw new Error('unreachable');
    }
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    if (this.props.type !== 'number') {
      throw new Error('unreachable');
    }
    return (
      <Label subText={this.props.description} text={this.props.name}>
        <NumberInput
          canBeNegative={this.props.canBeNegative}
          max={this.props.max}
          min={this.props.min}
          onChange={this.handleChange}
          suffix={this.props.suffix}
          style={{display: 'inline-flex'}}
          tabIndex={this.props.open ? 0 : -1}
          value={this.props.value}
        />
      </Label>
    );
  }
}
