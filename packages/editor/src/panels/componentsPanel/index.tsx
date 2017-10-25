import {connect} from 'react-redux';
import * as React from 'react';

import {primitives} from '@pinecast/sb-components';
import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import ButtonPresetList from './ButtonPresetList';
import {changeButtonStyle, changeColor} from '../../actions/theme';
import ColorPicker from '../ColorPicker';
import {
  PanelDescription,
  PanelHeader,
  PanelSection,
  PanelWrapper,
} from '../common';
import {ReducerType} from '../../reducer';

const ComponentsPanel = ({
  changeButtonStyle,
  changeColor,
  colorButtons,
  colorButtonsText,
  styling,
}: {
  colorButtons: string;
  colorButtonsText: string;
  changeButtonStyle: ((payload: primitives.ButtonStyle) => void);
  changeColor: ((colors: {[color: string]: string}) => void);
  styling: Object;
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
        ...(theme.styling as {buttons: primitives.ButtonStyle}),
        ...state.theme.styling,
      },
    };
  },
  {
    changeButtonStyle,
    changeColor,
  },
)(ComponentsPanel);
