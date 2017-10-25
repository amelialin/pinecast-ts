import {connect} from 'react-redux';
import * as React from 'react';

import {primitives} from '@pinecast/sb-components';

import {ReducerType} from '../../reducer';
import buttonPresets from './buttonPresets';
import ButtonPreview from './ButtonPreview';
import {changeButtonStyle} from '../../actions/theme';

const ButtonPresetList = ({
  changeButtonStyle,
}: {
  changeButtonStyle: ((payload: primitives.ButtonStyle) => void);
}) => (
  <div>
    {buttonPresets.map((preset, i) => (
      <ButtonPreview
        key={i}
        onClick={() => changeButtonStyle(preset.style)}
        preset={preset}
      />
    ))}
  </div>
);
export default connect(null, {changeButtonStyle})(ButtonPresetList);
