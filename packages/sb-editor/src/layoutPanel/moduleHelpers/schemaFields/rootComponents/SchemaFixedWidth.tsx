import * as React from 'react';

import Label from '@pinecast/common/Label';
import PaddingInput, {
  formatPadding,
  parsePadding,
  StructuredValue as Padding,
} from '@pinecast/common/PaddingInput';

import ElementColorSelector from '../../../ElementColorSelector';
import {SchemaProps} from '../types';

export default class SchemaFixedWidth extends React.PureComponent {
  props: SchemaProps;

  handleElementOptionsChange(newEO: Object) {
    this.props.onChange(this.props.field, {...this.props.value, ...newEO});
  }

  handleBGChange = (newBG: string) => {
    this.handleElementOptionsChange({bgColor: newBG || undefined});
  };
  handleFGChange = (newFG: string) => {
    this.handleElementOptionsChange({fgColor: newFG || undefined});
  };
  handleInnerPaddingChange = (innerPadding: Padding) => {
    this.handleElementOptionsChange({
      innerPadding: formatPadding(innerPadding),
    });
  };
  handleOuterPaddingChange = (outerPadding: Padding) => {
    this.handleElementOptionsChange({
      outerPadding: formatPadding(outerPadding),
    });
  };
  render() {
    const {open, value = {}} = this.props;
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
            value={parsePadding(value.outerPadding)}
          />
        </Label>
        <Label text="Inner padding">
          <PaddingInput
            onChange={this.handleInnerPaddingChange}
            tabIndex={open ? 0 : -1}
            value={parsePadding(value.innerPadding)}
          />
        </Label>
      </React.Fragment>
    );
  }
}
