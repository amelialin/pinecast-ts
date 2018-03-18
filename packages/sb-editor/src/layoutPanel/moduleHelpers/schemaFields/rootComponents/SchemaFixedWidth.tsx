import {connect} from 'react-redux';
import * as React from 'react';

import Button from '@pinecast/common/Button';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import PaddingInput, {
  formatPadding,
  parsePadding,
  StructuredValue as Padding,
} from '@pinecast/common/PaddingInput';
import Select from '@pinecast/common/Select';

import * as chromeActions from '../../../../actions/chrome';
import colorKeyNames from '../../../../shared/colorNames';
import {SchemaProps} from '../types';

const colorsOptionalKeys = {...colorKeyNames, '': '--'};

class SchemaFixedWidth extends React.PureComponent {
  props: SchemaProps & {goToColors: () => void};

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
    const {goToColors, open, value = {}} = this.props;
    return (
      <React.Fragment>
        <Label text="Background color">
          <Group spacing={8}>
            <Select
              onChange={this.handleBGChange}
              options={colorsOptionalKeys}
              tabIndex={open ? 0 : -1}
              value={value.bgColor || ''}
            />
            <Button onClick={goToColors} tabIndex={open ? 0 : -1}>
              Change colors
            </Button>
          </Group>
        </Label>
        <Label text="Foreground color">
          <Group spacing={8}>
            <Select
              onChange={this.handleFGChange}
              options={colorsOptionalKeys}
              tabIndex={open ? 0 : -1}
              value={value.fgColor || ''}
            />
            <Button onClick={goToColors} tabIndex={open ? 0 : -1}>
              Change colors
            </Button>
          </Group>
        </Label>
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

export default connect(null, dispatch => ({
  goToColors: () => {
    dispatch(chromeActions.changeChromePage('theme'));
    dispatch(chromeActions.changeThemePage('colors'));
  },
}))(SchemaFixedWidth) as React.ComponentType<SchemaProps>;
