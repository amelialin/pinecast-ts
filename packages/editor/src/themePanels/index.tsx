import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {changeThemePage} from '../actions/chrome';
import ColorsPanel from './colorsPanel';
import ButtonsPanel from './buttonsPanel';
import EmbedWidgetPanel from './EmbedWidgetPanel';
import PageBodyPanel from './PageBodyPanel';
import {PageSelector} from '../panelComponents';
import PresetsPanel from './presetsPanel';
import {ReducerType} from '../reducer';
import SaveOptions from '../SaveOptions';
import * as StickyHeader from '../common/StickyHeader';
import TypographyPanel from './typographyPanel';

const pageOptions = [
  {value: 'presets', name: 'Presets'},
  {value: 'colors', name: 'Colors'},
  {value: 'typography', name: 'Typography'},
  {value: 'buttons', name: 'Buttons'},
  {value: 'embedPlayer', name: 'Embed player'},
  {value: 'page', name: 'Page body'},
];

const ThemePanel = ({
  changeThemePage,
  themePage,
}: {
  changeThemePage: (name: string) => void;
  themePage: ReducerType['themePage'];
}) => (
  <StickyHeader.Wrapper
    header={
      <StickyHeader.Header>
        <PageSelector
          onChange={changeThemePage}
          options={pageOptions}
          selected={themePage}
        />
        <SaveOptions />
      </StickyHeader.Header>
    }
    keyScrollOn={themePage}
  >
    {themePage === 'presets' && <PresetsPanel />}
    {themePage === 'colors' && <ColorsPanel />}
    {themePage === 'typography' && <TypographyPanel />}
    {themePage === 'page' && <PageBodyPanel />}
    {themePage === 'embedPlayer' && <EmbedWidgetPanel />}
    {themePage === 'buttons' && <ButtonsPanel />}
  </StickyHeader.Wrapper>
);

export default connect(
  (state: ReducerType) => ({themePage: state.themePage}),
  dispatch => ({changeThemePage: name => dispatch(changeThemePage(name))}),
)(ThemePanel);
