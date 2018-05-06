import * as React from 'react';

import Label from '@pinecast/common/Label';
import PaddingInput, {
  formatPadding,
  getPaddingUnit,
  parsePadding,
  StructuredValue as Padding,
} from '@pinecast/common/PaddingInput';

import ElementColorSelector from '../../../ElementColorSelector';
import {SchemaProps} from '../types';

export default class SchemaFixedWidth extends React.PureComponent {
  props: SchemaProps;

  handleElementOptionsChange(newEO: Object) {
    if (this.props.type !== 'rootComponents.fixedWidth') {
      throw new Error('unreachable');
    }
    this.props.onChange(this.props.field, {...this.props.value, ...newEO});
  }

  handleBGChange = (newBG: string) => {
    this.handleElementOptionsChange({bgColor: newBG || undefined});
  };
  handleFGChange = (newFG: string) => {
    this.handleElementOptionsChange({fgColor: newFG || undefined});
  };

  getPaddingUnit(field: 'innerPadding' | 'outerPadding'): 'px' | '%' {
    const value = this.props.value as {[key: string]: any};
    return getPaddingUnit(value[field] || '0 0');
  }
  handleInnerPaddingChange = (innerPadding: Padding) => {
    this.handleElementOptionsChange({
      innerPadding: formatPadding(
        innerPadding,
        this.getPaddingUnit('innerPadding'),
      ),
    });
  };
  handleOuterPaddingChange = (outerPadding: Padding) => {
    this.handleElementOptionsChange({
      outerPadding: formatPadding(
        outerPadding,
        this.getPaddingUnit('outerPadding'),
      ),
    });
  };
  render() {
    if (this.props.type !== 'rootComponents.fixedWidth') {
      throw new Error('unreachable');
    }
    const {open, value = {} as {[key: string]: any}} = this.props;
    return (
      <React.Fragment>
        <ElementColorSelector
          onChange={this.handleBGChange}
          type="background"
          value={value.bgColor || ''}
        />
        <ElementColorSelector
          onChange={this.handleFGChange}
          type="foreground"
          value={value.fgColor || ''}
        />
        <Label text="Outer padding">
          <PaddingInput
            onChange={this.handleOuterPaddingChange}
            tabIndex={open ? 0 : -1}
            unit={this.getPaddingUnit('outerPadding')}
            value={parsePadding(value.outerPadding)}
          />
        </Label>
        <Label text="Inner padding">
          <PaddingInput
            onChange={this.handleInnerPaddingChange}
            tabIndex={open ? 0 : -1}
            unit={this.getPaddingUnit('innerPadding')}
            value={parsePadding(value.innerPadding)}
          />
        </Label>
      </React.Fragment>
    );
  }
}
