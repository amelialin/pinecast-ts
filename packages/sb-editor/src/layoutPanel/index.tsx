import {connect} from 'react-redux';
import * as React from 'react';

import {changeLayoutPage} from '../actions/chrome';
import ModulesPanel from './modulesPanel';
import {PageSelector} from '../panelComponents';
import {ReducerType} from '../reducer';
import SaveOptions from '../SaveOptions';
import * as StickyHeader from '@pinecast/common/StickyHeader';

const pageOptions = [
  {value: 'modules', name: 'Modules'},
  {value: 'episodeItems', name: 'Episode items'},
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
  </StickyHeader.Wrapper>
);

export default connect(
  (state: ReducerType) => ({layoutPage: state.layoutPage}),
  dispatch => ({changeLayoutPage: name => dispatch(changeLayoutPage(name))}),
)(LayoutPanel);
