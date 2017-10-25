import {connect} from 'react-redux';
import * as React from 'react';

import * as presets from '@pinecast/sb-presets';
import styled from '@pinecast/sb-styles';

import {changePreset} from '../../actions/theme';
import {PanelDescription, PanelHeader, PanelWrapper} from '../common';
import PreviewTile from './PreviewTile';
import {ReducerType} from '../../reducer';

const PresetsPanel = ({
  preset,
  changePreset,
}: {
  preset: ReducerType['theme']['$type'];
  changePreset: (string) => void;
}) => (
  <PanelWrapper>
    <PanelHeader>Presets</PanelHeader>
    <PanelDescription>
      Presets are the foundation of your site's theme. Choosing a preset will
      reset your theme to use the preset's settings.
    </PanelDescription>
    <div>
      {Object.keys(presets.themes).map(preset => (
        <PreviewTile key={preset} onSelect={changePreset} type={preset} />
      ))}
    </div>
  </PanelWrapper>
);

export default connect(
  (state: ReducerType) => ({
    preset: state.theme.$type,
  }),
  {changePreset},
)(PresetsPanel);
