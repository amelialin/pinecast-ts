import {connect} from 'react-redux';
import * as React from 'react';

import Button from '@pinecast/common/Button';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';

import colorKeyNames from '../shared/colorNames';
import * as chromeActions from '../actions/chrome';

const colorsOptionalKeys = {...colorKeyNames, '': '--'};

class ElementColorSelector extends React.PureComponent {
  props: {
    goToColors: () => void;
    onChange: (newColor: string | undefined) => void;
    type: 'background' | 'foreground';
    value: string | null | undefined;
  };

  handleChange = (newValue: string) => {
    this.props.onChange(newValue || undefined);
  };

  render() {
    const {goToColors, type, value} = this.props;
    return (
      <Label
        $oneLine
        text={type === 'background' ? 'Background color' : 'Foreground color'}
      >
        <Group spacing={8}>
          <Select
            onChange={this.handleChange}
            options={colorsOptionalKeys}
            value={value || ''}
          />
          <Button onClick={goToColors}>Change colors</Button>
        </Group>
      </Label>
    );
  }
}
export default connect(null, dispatch => ({
  goToColors: () => {
    dispatch(chromeActions.changeChromePage('theme'));
    dispatch(chromeActions.changeThemePage('colors'));
  },
}))(ElementColorSelector);
