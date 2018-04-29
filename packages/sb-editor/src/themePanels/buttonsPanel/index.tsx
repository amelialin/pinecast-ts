import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';

import ButtonPresetList from './ButtonPresetList';
import ButtonPreview from './ButtonPreview';
import Card from '@pinecast/common/Card';
import {changeColor} from '../../actions/theme';
import ColorPicker from '../ColorPicker';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {ReducerType} from '../../reducer';

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
    <Card style={{backgroundColor: currentForeground, display: 'block'}}>
      <ButtonPreview
        preset={{name: 'Current style', style: theme.styling.buttons}}
        style={{marginRight: 0, marginBottom: 0}}
        theme={theme}
      />
    </Card>

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
