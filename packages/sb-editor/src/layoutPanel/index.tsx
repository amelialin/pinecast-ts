import {connect} from 'react-redux';
import * as React from 'react';

import EpisodeItemPanel from './episodeItemPanel';
import {changeLayoutPage} from '../actions/chrome';
import ModulesPanel from './modulesPanel';
import {PageSelector} from '../panelComponents';
import {ReducerType} from '../reducer';
import SaveOptions from '../SaveOptions';
import * as StickyHeader from '@pinecast/common/StickyHeader';
import WrappersPanel from './wrappersPanel';

const pageOptions = [
  {value: 'modules', name: 'Header and footer'},
  {value: 'episodeItems', name: 'Episode lists'},
  {value: 'wrappers', name: 'Page wrappers'},
];

const LayoutPanel = ({
  changeLayoutPage,
  layoutPage,
}: {
  changeLayoutPage: (name: string) => void;
  layoutPage: ReducerType['layoutPage'];
}) => (
  <StickyHeader.Wrapper
    header={
      <StickyHeader.Header $headerHeight={60}>
        <PageSelector
          onChange={changeLayoutPage}
          options={pageOptions}
          selected={layoutPage}
        />
        <SaveOptions />
      </StickyHeader.Header>
    }
  >
    {layoutPage === 'modules' && <ModulesPanel />}
    {layoutPage === 'episodeItems' && <EpisodeItemPanel />}
    {layoutPage === 'wrappers' && <WrappersPanel />}
  </StickyHeader.Wrapper>
);

export default connect(
  (state: ReducerType) => ({layoutPage: state.layoutPage}),
  {changeLayoutPage},
)(LayoutPanel);
