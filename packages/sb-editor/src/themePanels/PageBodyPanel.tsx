import {connect} from 'react-redux';
import * as React from 'react';

import Label from '@pinecast/common/Label';
import PaddingInput, {
  formatPadding,
  parsePadding,
} from '@pinecast/common/PaddingInput';
import * as presets from '@pinecast/sb-presets';
import {primitives} from '@pinecast/sb-components';
import Range from '@pinecast/common/Range';
import RadioList from '@pinecast/common/RadioList';
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
  const unit = paddingValue.includes('%') ? '%' : 'px';

  return (
    <PanelWrapper>
      <Label
        text={`Padding (${units[unit]})`}
        subText="The space between the left and right edges of the window and the page content"
      >
        <PaddingInput
          onChange={value => {
            changePageStyle({padding: formatPadding(value, unit)});
          }}
          unit={unit}
          value={parsePadding(paddingValue)}
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
