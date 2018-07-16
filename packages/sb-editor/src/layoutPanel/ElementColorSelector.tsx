import {connect, Dispatch} from 'react-redux';
import * as React from 'react';

import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import Link from '@pinecast/common/Link';
import Select from '@pinecast/common/Select';

import colorKeyNames from '../shared/colorNames';
import * as chromeActions from '../actions/chrome';

const colorsOptionalKeys = {...colorKeyNames, '': '-- Theme default'};

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
        <Group spacing={8} wrapperStyle={{alignItems: 'center'}}>
          <Select
            disabled={this.props.disabled}
            onChange={this.handleChange}
            options={Object.entries(colorsOptionalKeys).map(([key, value]) => ({
              key,
              label: value,
            }))}
            value={value || ''}
          />
          <Link onClick={goToColors}>Change color palette…</Link>
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
