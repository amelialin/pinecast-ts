import {connect} from 'react-redux';
import * as React from 'react';

import {primitives} from '@pinecast/sb-components';
import * as presets from '@pinecast/sb-presets';

import {changePageOptions, changePageStyle} from '../../actions/theme';
import Label from '../../common/Label';
import {PanelDivider} from '../../panelComponents';
import RadioList from '../../common/RadioList';
import Range from '../../common/Range';
import {ReducerType} from '../../reducer';
import TextInput from '../../common/TextInput';
import Tabs, {Tab} from '../../common/Tabs';

const units = {
  px: 'pixels',
  '%': 'percent',
};
function parsePadding(value: string): {amount: number; unit: string} {
  if (value === '0') {
    return {amount: 0, unit: 'px'};
  }
  const match = /([0-9]+)(px|%)/.exec(value);
  if (!match) {
    return {amount: 0, unit: 'px'};
  }
  const amount = Number(match[1]),
    unit = match[2];
  return {amount, unit};
}
function formatPadding(
  horizAmount: number,
  horizUnit: string,
  vertAmount: number,
  vertUnit: string,
): string {
  const horiz = `${horizAmount}${horizUnit}`;
  const vert = `${vertAmount}${vertUnit}`;
  if (horiz === vert) {
    return horiz;
  }
  return `${vert} ${horiz}`;
}

const ComponentsPanel = ({
  changePageOptions,
  changePageStyle,
  theme,
}: {
  changePageOptions: ((options: ReducerType['theme']['options']) => void);
  changePageStyle: ((style: primitives.PageStyle) => void);
  theme: any;
}) => {
  const paddingValue = String(
    (theme.styling.page && theme.styling.page.padding) || '0 0',
  );
  const [verticalPadding, horizontalPadding] = paddingValue.split(' ', 2);

  const {amount: vertAmount, unit: vertUnit} = parsePadding(verticalPadding);
  const {amount: horizAmount, unit: horizUnit} = parsePadding(
    horizontalPadding || verticalPadding,
  );

  return (
    <React.Fragment>
      <Label text={`Horizontal padding (${units[horizUnit]})`}>
        <Range
          min={0}
          max={101}
          onChange={value => {
            changePageStyle({
              padding: formatPadding(value, horizUnit, vertAmount, vertUnit),
            });
          }}
          value={horizAmount}
        />
      </Label>
      <Label text={`Vertical padding (${units[vertUnit]})`}>
        <Range
          min={0}
          max={101}
          onChange={value => {
            changePageStyle({
              padding: formatPadding(horizAmount, horizUnit, value, vertUnit),
            });
          }}
          value={vertAmount}
        />
      </Label>
      <Label
        componentType="div"
        labelStyle={{marginBottom: '1em'}}
        text="Body style"
      >
        <RadioList
          options={{
            fluid: () => (
              <Label componentType="div" text="Fluid width">
                The page will automatically adjust to the size of the window
              </Label>
            ),
            '1280px': () => (
              <Label componentType="div" text="Wide fixed-width">
                Centered on the page, 1280 pixels wide
              </Label>
            ),
            '960px': () => (
              <Label componentType="div" text="Standard fixed-width">
                Centered on the page, 960 pixels wide
              </Label>
            ),
            '600px': () => (
              <Label componentType="div" text="Narrow fixed-width">
                Centered on the page, 600 pixels wide
              </Label>
            ),
          }}
          onChange={newValue => {
            if (newValue === 'fluid') {
              changePageOptions({fixedWidthMax: null});
            } else {
              changePageOptions({fixedWidthMax: newValue});
            }
          }}
          value={theme.options.fixedWidthMax || 'fluid'}
        />
      </Label>
      <PanelDivider />
      <Label text="Default font size">
        <Range
          min={10}
          max={30}
          onChange={value => {
            changePageStyle({
              fontSize: value,
            });
          }}
          value={(theme.styling.page && theme.styling.page.fontSize) || 16}
        />
      </Label>
    </React.Fragment>
  );
};

export default connect(
  (state: ReducerType) => {
    const theme = state.theme;
    const presetTheme = presets.themes[state.theme.$type];

    return {
      theme: {
        ...presetTheme,
        colors: {
          ...presetTheme.colors,
          ...theme.colors,
        },
        fonts: {
          ...presetTheme.fonts,
          ...theme.fonts,
        },
        options: {
          ...presetTheme.options,
          ...theme.options,
        },
        styling: {
          buttons: {
            ...(presetTheme.styling && presetTheme.styling.buttons),
            ...(theme.styling && theme.styling.buttons),
          },
          page: {
            ...(presetTheme.styling && presetTheme.styling.page),
            ...(theme.styling && theme.styling.page),
          },
        },
      },
    };
  },
  {
    changePageOptions,
    changePageStyle,
  },
)(ComponentsPanel);
