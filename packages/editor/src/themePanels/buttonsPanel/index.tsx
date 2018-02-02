import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import ButtonPresetList from './ButtonPresetList';
import ButtonPreview from './ButtonPreview';
import {changeColor} from '../../actions/theme';
import ColorPicker from '../ColorPicker';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {ReducerType} from '../../reducer';

const ButtonStyleWrapper = styled('div', {
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  marginBottom: 20,
  padding: 20,
});

const ComponentsPanel = ({
  colorButtons,
  colorButtonsText,
  changeColor,
  currentForeground,
  presetButtonStyle,
  theme,
}: {
  colorButtons: string;
  colorButtonsText: string;
  changeColor: ((colors: {[color: string]: string}) => void);
  currentForeground: string;
  presetButtonStyle: React.CSSProperties;
  theme: any;
}) => (
  <PanelWrapper>
    <PanelDescription>
      Customize the look and feel of the buttons used for pagination and
      subscriptions.
    </PanelDescription>
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
  </PanelWrapper>
);

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
        options: {
          ...presetTheme.options,
          ...theme.options,
        },
        styling: {
          buttons: {
            ...(presetTheme.styling && presetTheme.styling.buttons),
            ...(theme.styling && theme.styling.buttons),
          },
        },
      },
    };
  },
  {
    changeColor,
  },
)(ComponentsPanel);
