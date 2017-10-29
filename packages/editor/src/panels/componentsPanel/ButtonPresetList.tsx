import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';
import {primitives} from '@pinecast/sb-components';

import {ReducerType} from '../../reducer';
import buttonPresets from './buttonPresets';
import ButtonPreview from './ButtonPreview';
import {changeButtonStyle} from '../../actions/theme';

const ButtonPresetList = ({
  theme,
  changeButtonStyle,
}: {
  theme: Object;
  changeButtonStyle: ((payload: primitives.ButtonStyle) => void);
}) => (
  <div>
    {buttonPresets.map((preset, i) => (
      <ButtonPreview
        key={i}
        onClick={() => changeButtonStyle(preset.style)}
        preset={preset}
        theme={theme}
      />
    ))}
  </div>
);
export default connect(
  (state: ReducerType) => {
    const theme = state.theme;
    const preset = presets.themes[theme.$type];
    return {
      theme: {
        ...preset,
        colors: {
          ...preset.colors,
          ...theme.colors,
        },
        fonts: {
          ...preset.fonts,
          ...theme.fonts,
        },
      },
    };
  },
  {changeButtonStyle},
)(ButtonPresetList);
