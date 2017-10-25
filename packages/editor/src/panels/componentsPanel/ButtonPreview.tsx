import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import {ReducerType} from '../../reducer';
import {Preset} from './buttonPresets';

const Button = styled(
  'button',
  {
    border: 0,
    display: 'inline-flex',
    lineHeight: '1em',
    marginRight: 30,
    marginBottom: 30,
    textDecoration: 'none',
  },
  {type: 'button'},
);

const ButtonPreview = ({
  colorButtons,
  colorButtonsText,
  onClick = () => {},
  preset,
}: {
  colorButtons: string;
  colorButtonsText: string;
  onClick: () => void;
  preset: Preset;
}) => (
  <Button
    onClick={onClick}
    style={{
      backgroundColor: colorButtons,
      borderRadius: 0,
      color: colorButtonsText,
      ...preset.style,
    }}
  >
    {preset.name}
  </Button>
);

export default connect((state: ReducerType) => {
  const theme = presets.themes[state.theme.$type];
  return {
    colorButtons:
      (state.theme.colors && state.theme.colors.buttons) ||
      theme.colors.buttons,
    colorButtonsText:
      (state.theme.colors && state.theme.colors.buttonsText) ||
      theme.colors.buttonsText,
  };
})(ButtonPreview);
