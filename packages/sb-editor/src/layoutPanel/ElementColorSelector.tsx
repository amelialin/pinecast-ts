import {connect, Dispatch} from 'react-redux';
import * as React from 'react';

import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import Link from '@pinecast/common/Link';
import * as presets from '@pinecast/sb-presets';
import SelectCustom from '@pinecast/common/SelectCustom';
import styled from '@pinecast/styles';

import colorKeyNames from '../shared/colorNames';
import * as chromeActions from '../actions/chrome';
import {ReducerType} from '../reducer';

const colorsOptionalKeys = {...colorKeyNames, '': '-- Preset default'};

type Props = {
  disabled?: boolean;
  onChange: (newColor: string | undefined) => void;
  type: 'background' | 'foreground';
  value: string | null | undefined;
};

const TinyChiclet = styled('i', ({$color}: {$color: string}) => ({
  backgroundColor: $color,
  borderRadius: 2,
  boxShadow: '0 0 0.5px rgba(0, 0, 0, 0.2)',
  display: 'inline-block',
  height: 8,
  width: 8,
}));

class ElementColorSelector extends React.PureComponent {
  props: Props & {
    colors: {[color: string]: string};
    goToColors: () => void;
  };

  handleChange = (newValue: string) => {
    this.props.onChange(newValue || undefined);
  };

  render() {
    const {colors, goToColors, type, value} = this.props;
    return (
      <Label
        $oneLine
        text={type === 'background' ? 'Background color' : 'Foreground color'}
      >
        <Group spacing={8} wrapperStyle={{alignItems: 'center'}}>
          <SelectCustom
            disabled={this.props.disabled}
            onChange={this.handleChange}
            options={Object.entries(colorsOptionalKeys).map(([key, value]) => ({
              key,
              render() {
                if (!key) {
                  return value;
                }
                return (
                  <Group
                    spacing={8}
                    wrapperStyle={{alignItems: 'center', marginTop: -2}}
                  >
                    <TinyChiclet $color={colors[key]} />
                    <span>{value}</span>
                  </Group>
                );
              },
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
  (state: ReducerType, ownProps: Props) => ({
    ...ownProps,
    colors: {
      ...presets.themes[state.theme.$type].colors,
      ...state.theme.colors,
    },
  }),
  (dispatch: Dispatch<any>) => ({
    goToColors: () => {
      dispatch(chromeActions.changeChromePage('theme'));
      dispatch(chromeActions.changeThemePage('colors'));
    },
  }),
)(ElementColorSelector);
