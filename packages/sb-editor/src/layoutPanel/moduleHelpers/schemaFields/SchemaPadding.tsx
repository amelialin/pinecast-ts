import * as React from 'react';

import Label from '@pinecast/common/Label';
import PaddingInput, {
  formatPadding,
  getPaddingUnit,
  parsePadding,
  StructuredValue,
} from '@pinecast/common/PaddingInput';

import {PaddingProps} from './types';

export default class SchemaPadding extends React.PureComponent {
  props: PaddingProps;

  handleChange = (newValue: StructuredValue) => {
    if (this.props.type !== 'padding') {
      throw new Error('unreachable');
    }
    this.props.onChange(
      this.props.field,
      formatPadding(newValue, getPaddingUnit(this.props.value)),
    );
  };
  render() {
    if (this.props.type !== 'padding') {
      throw new Error('unreachable');
    }
    return (
      <Label subText={this.props.description} text={this.props.name}>
        <PaddingInput
          onChange={this.handleChange}
          tabIndex={this.props.open ? 0 : -1}
          unit={getPaddingUnit(this.props.value || '0 0')}
          value={parsePadding(this.props.value)}
        />
      </Label>
    );
  }
}
