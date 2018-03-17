import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';
import {primitives} from '@pinecast/sb-components';
import styled from '@pinecast/styles';

import {ReducerType} from '../../reducer';
import buttonPresets from './buttonPresets';
import ButtonPreview from './ButtonPreview';
import {changeButtonStyle} from '../../actions/theme';

const Wrapper = styled('div', {
  fontSize: 16,
  padding: '20px 0 0',
});

const ButtonPresetList = ({
  theme,
  changeButtonStyle,
}: {
  theme: Object;
  changeButtonStyle: ((payload: React.CSSProperties) => void);
}) => (
  <Wrapper>
    {buttonPresets.map((preset, i) => (
      <ButtonPreview
        key={i}
        onClick={() => changeButtonStyle(preset.style)}
        preset={preset}
        theme={theme}
      />
    ))}
  </Wrapper>
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
