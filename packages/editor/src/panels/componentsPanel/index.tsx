import {connect} from 'react-redux';
import * as React from 'react';

import {primitives} from '@pinecast/sb-components';
import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import ButtonPresetList from './ButtonPresetList';
import {changeColor, changeEmbedWidget} from '../../actions/theme';
import ColorPicker from '../ColorPicker';
import Label from '../../common/Label';
import {
  PanelDescription,
  PanelHeader,
  PanelSection,
  PanelWrapper,
} from '../common';
import RadioList from '../../common/RadioList';
import {ReducerType} from '../../reducer';

const ComponentsPanel = ({
  colorButtons,
  colorButtonsText,
  changeColor,
  changeEmbedWidget,
  styling,
}: {
  colorButtons: string;
  colorButtonsText: string;
  changeColor: ((colors: {[color: string]: string}) => void);
  changeEmbedWidget: ((theme: string) => void);
  styling: {
    buttons: primitives.ButtonStyling;
    embed?: {theme: string};
  };
}) => (
  <PanelWrapper>
    <PanelHeader>Components</PanelHeader>
    <PanelDescription>
      Each of these components make up various parts of your website.
    </PanelDescription>
    <PanelSection>Buttons</PanelSection>
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
    <ButtonPresetList />
    <PanelSection>Embed Player</PanelSection>
    <RadioList
      options={{
        minimal: () => (
          <Label text="Minimal">Simple, clean, and to the point</Label>
        ),
        thick: () => (
          <Label text="Thick">
            Big and colorful, full of metadata and a seek bar
          </Label>
        ),
        slim: () => (
          <Label text="Slim">
            Compact and efficient, only the absolute necessities
          </Label>
        ),
      }}
      onChange={changeEmbedWidget}
      value={(styling.embed && styling.embed.theme) || 'minimal'}
    />
  </PanelWrapper>
);

export default connect(
  (state: ReducerType) => {
    const theme = presets.themes[state.theme.$type];

    return {
      colorButtons:
        (state.theme.colors && state.theme.colors.buttons) ||
        theme.colors.buttons,
      colorButtonsText:
        (state.theme.colors && state.theme.colors.buttonsText) ||
        theme.colors.buttonsText,
      styling: {
        ...(theme.styling as any),
        ...state.theme.styling,
      },
    };
  },
  {
    changeColor,
    changeEmbedWidget,
  },
)(ComponentsPanel);
