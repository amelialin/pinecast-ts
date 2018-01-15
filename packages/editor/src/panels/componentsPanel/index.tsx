import {connect} from 'react-redux';
import * as React from 'react';

import {primitives} from '@pinecast/sb-components';
import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import ButtonPresetList from './ButtonPresetList';
import ButtonPreview from './ButtonPreview';
import {
  changeColor,
  changeEmbedWidget,
  changePageStyle,
} from '../../actions/theme';
import {colorKeyNames} from '../../constants';
import ColorPicker from '../ColorPicker';
import {EmbedWidgetThemes} from '../../reducers/theme';
import Label from '../../common/Label';
import PageStyles from './PageStyles';
import {PanelDescription, PanelHeader, PanelWrapper} from '../common';
import RadioList from '../../common/RadioList';
import {ReducerType} from '../../reducer';
import Tabs, {Tab} from '../../common/Tabs';

const ButtonStyleWrapper = styled('div', {
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1), 0 3px 7px rgba(0, 0, 0, 0.05)',
  marginBottom: 20,
  padding: 20,
});

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
  colorButtons,
  colorButtonsText,
  changeColor,
  changeEmbedWidget,
  changePageStyle,
  currentForeground,
  presetButtonStyle,
  theme,
}: {
  colorButtons: string;
  colorButtonsText: string;
  changeColor: ((colors: {[color: string]: string}) => void);
  changeEmbedWidget: ((theme: string) => void);
  changePageStyle: ((style: primitives.PageStyle) => void);
  currentForeground: string;
  presetButtonStyle: React.CSSProperties;
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
      <PanelHeader>Components</PanelHeader>
      <PanelDescription>
        Each of these components make up various parts of your website.
      </PanelDescription>
      <Tabs>
        <Tab name="Page body">
          <PageStyles />
        </Tab>

        <Tab name="Buttons">
          <ButtonStyleWrapper style={{backgroundColor: currentForeground}}>
            <ButtonPreview
              preset={{name: 'Current style', style: theme.styling.buttons}}
              style={{marginRight: 0, marginBottom: 0}}
              theme={theme}
            />
          </ButtonStyleWrapper>

          <ColorPicker
            colorKey="buttons"
            colorValue={colorButtons}
            onChange={color => changeColor({buttons: color})}
          />
          <ColorPicker
            colorKey="buttonsText"
            colorValue={colorButtonsText}
            onChange={color => changeColor({buttonsText: color})}
          />
          <ButtonPreview
            preset={{name: 'Preset default', style: presetButtonStyle}}
            style={{marginBottom: 10, marginTop: 10}}
            theme={theme}
          />
          <ButtonPresetList />
        </Tab>

        <Tab name="Embed player">
          <RadioList
            options={{
              minimal: () => (
                <Label componentType="div" text="Minimal">
                  Simple, clean, and to the point
                </Label>
              ),
              thick: () => (
                <Label componentType="div" text="Thick">
                  Big and colorful, full of metadata and a seek bar
                </Label>
              ),
              slim: () => (
                <Label componentType="div" text="Slim">
                  Compact and efficient, only the absolute necessities
                </Label>
              ),
            }}
            onChange={changeEmbedWidget}
            value={theme.options.embedTheme || 'minimal'}
          />
        </Tab>
      </Tabs>
    </PanelWrapper>
  );
};

export default connect(
  (state: ReducerType) => {
    const theme = state.theme;
    const presetTheme = presets.themes[state.theme.$type];

    return {
      colorButtons:
        (theme.colors && theme.colors.buttons) || presetTheme.colors.buttons,
      colorButtonsText:
        (theme.colors && theme.colors.buttonsText) ||
        presetTheme.colors.buttonsText,
      currentForeground:
        (theme.colors && theme.colors.foreground) ||
        presetTheme.colors.foreground,
      presetButtonStyle: presetTheme.styling.buttons,
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
    changeColor,
    changeEmbedWidget,
    changePageStyle,
  },
)(ComponentsPanel);
