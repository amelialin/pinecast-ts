import * as React from 'react';

import {Omit} from './types';
import TextInput, {Props} from './TextInput';

export default class NumberInput extends React.PureComponent {
  props: Omit<Omit<Props, 'onChange'>, 'value'> & {
    canBeNegative?: boolean;
    max?: number;
    min?: number;
    onChange: (value: number) => void;
    upToPrecision?: number;
    value: number;
  };

  static defaultProps = {
    canBeNegative: true,
    max: Infinity,
    min: -Infinity,
    upToPrecision: 0,
  };

  handleChange = (value: string) => {
    let v = parseFloat(value);
    if (isNaN(v)) {
      v = 0;
    }
    if (!this.props.canBeNegative && v < 0) {
      v = 0;
    }
    const precisionFactor = 10 ** (this.props.upToPrecision || 0);
    v = Math.floor(v * precisionFactor) / precisionFactor;
    v = Math.min(this.props.max || Infinity, v);
    v = Math.max(this.props.min || -Infinity, v);
    this.props.onChange(v);
  };

  getStringValue(): string {
    const val = String(this.props.value.toFixed(this.props.upToPrecision || 0));
    const s = val.split('.');
    if (!s[1]) {
      return s[0];
    }
    if (Array.from(s[1]).every(x => x === '0')) {
      return s[0];
    }
    return s[0] + '.' + s[1].replace(/0+$/, '');
  }

  render() {
    const {canBeNegative, onChange, upToPrecision, ...rest} = this.props;
    return (
      <TextInput
        {...rest}
        onChange={this.handleChange}
        value={this.getStringValue()}
      />
    );
  }
}
