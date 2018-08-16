import {connect} from 'react-redux';
import * as React from 'react';

import {changeContentPage} from '../actions/chrome';
import LinksPanel from './linkPanel';
import PagesPanel from './pagesPanel';
import {PageSelector} from '../panelComponents';
import {ReducerType} from '../reducer';
import SaveOptions from '../SaveOptions';
import * as StickyHeader from '@pinecast/common/StickyHeader';

const pageOptions = [
  {value: 'links', name: 'Links'},
  {value: 'pages', name: 'Pages'},
];

const ContentPanel = ({
  changeContentPage,
  contentPage,
}: {
  changeContentPage: (name: string) => void;
  contentPage: ReducerType['contentPage'];
}) => (
  <StickyHeader.Wrapper
    header={
      <StickyHeader.Header $headerHeight={60}>
        <PageSelector
          onChange={changeContentPage}
          options={pageOptions}
          selected={contentPage}
        />
        <SaveOptions />
      </StickyHeader.Header>
    }
  >
    {contentPage === 'links' && <LinksPanel />}
    {contentPage === 'pages' && <PagesPanel />}
  </StickyHeader.Wrapper>
);

export default connect(
  (state: ReducerType) => ({contentPage: state.contentPage}),
  {changeContentPage},
)(ContentPanel);
