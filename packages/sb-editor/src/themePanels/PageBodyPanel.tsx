import {connect} from 'react-redux';
import * as React from 'react';

import Label from '@pinecast/common/Label';
import * as presets from '@pinecast/sb-presets';
import {primitives} from '@pinecast/sb-components';
import RadioList from '@pinecast/common/RadioList';
import Range from '@pinecast/common/Range';
import TextInput from '@pinecast/common/TextInput';
import Tabs, {Tab} from '@pinecast/common/Tabs';

import {changePageOptions, changePageStyle} from '../actions/theme';
import {PanelDivider, PanelWrapper} from '../panelComponents';
import {ReducerType} from '../reducer';

const labelStyle = {fontSize: 16};

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

const PageBodyPanel = ({
  changePageOptions,
  changePageStyle,
  theme,
}: {
  changePageOptions: ((options: ReducerType['theme']['options']) => void);
  changePageStyle: ((style: Partial<primitives.PageStyle>) => void);
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
    <PanelWrapper>
      <Label
        text={`Horizontal padding (${units[horizUnit]})`}
        subText="The space between the left and right edges of the window and the page content"
      >
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
      <Label
        text={`Vertical padding (${units[vertUnit]})`}
        subText="The space between the top and bottom of the inside of the window and the page content"
      >
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
        subText="How your page adjusts to different screen sizes; fixed width will keep the page at a maximum size while flued width will grow to the window size"
      >
        <RadioList
          options={{
            fluid: () => (
              <Label
                componentType="div"
                labelStyle={labelStyle}
                text="Fluid width"
              >
                The page will automatically adjust to the size of the window
              </Label>
            ),
            '1280px': () => (
              <Label
                componentType="div"
                labelStyle={labelStyle}
                text="Wide fixed-width"
              >
                Centered on the page, 1280 pixels wide
              </Label>
            ),
            '960px': () => (
              <Label
                componentType="div"
                labelStyle={labelStyle}
                text="Standard fixed-width"
              >
                Centered on the page, 960 pixels wide
              </Label>
            ),
            '600px': () => (
              <Label
                componentType="div"
                labelStyle={labelStyle}
                text="Narrow fixed-width"
              >
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
      <Label
        text="Default font size"
        subText="The size of text used in episode descriptions and page bodies"
      >
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
    </PanelWrapper>
  );
};

export default connect(
  (state: ReducerType) => {
    const theme = state.theme;
    const presetTheme = presets.themes[state.theme.$type];

    return {
      theme: {
        ...presetTheme,
        options: {
          ...presetTheme.options,
          ...theme.options,
        },
        styling: {
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
)(PageBodyPanel);
