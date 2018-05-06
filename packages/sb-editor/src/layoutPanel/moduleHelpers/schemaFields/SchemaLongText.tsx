import * as React from 'react';

import Label from '@pinecast/common/Label';
import TextArea from '@pinecast/common/TextArea';

import {LongTextProps} from './types';

export default class SchemaText extends React.PureComponent {
  props: LongTextProps;

  handleChange = (newValue: string) => {
    if (this.props.type !== 'longText') {
      throw new Error('unreachable');
    }
    this.props.onChange(this.props.field, newValue);
  };
  render() {
    if (this.props.type !== 'longText') {
      throw new Error('unreachable');
    }
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
