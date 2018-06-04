import {connect, Dispatch} from 'react-redux';
import * as React from 'react';

import Button from '@pinecast/common/Button';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';

import colorKeyNames from '../shared/colorNames';
import * as chromeActions from '../actions/chrome';

const colorsOptionalKeys = {...colorKeyNames, '': '--'};

type Props = {
  disabled?: boolean;
  onChange: (newColor: string | undefined) => void;
  type: 'background' | 'foreground';
  value: string | null | undefined;
};

class ElementColorSelector extends React.PureComponent {
  props: Props & {
    goToColors: () => void;
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
            disabled={this.props.disabled}
            onChange={this.handleChange}
            options={Object.entries(colorsOptionalKeys).map(([key, value]) => ({
              key,
              label: value,
            }))}
            value={value || ''}
          />
          <Button disabled={this.props.disabled} onClick={goToColors}>
            Change colors
          </Button>
        </Group>
      </Label>
    );
  }
}
export default connect(
  (_, ownProps: Props) => ownProps,
  (dispatch: Dispatch<any>) => ({
    goToColors: () => {
      dispatch(chromeActions.changeChromePage('theme'));
      dispatch(chromeActions.changeThemePage('colors'));
    },
  }),
)(ElementColorSelector);
