import {connect} from 'react-redux';
import * as React from 'react';

// import styled from '@pinecast/sb-styles';

import {changeLayoutPage} from '../actions/chrome';
import {PageSelector} from '../panelComponents';
import {ReducerType} from '../reducer';
import SaveOptions from '../SaveOptions';
import * as StickyHeader from '../common/StickyHeader';

const pageOptions = [
  {value: 'modules', name: 'Modules'},
  {value: 'textStyles', name: 'Text styles'},
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
      <StickyHeader.Header>
        <PageSelector
          onChange={changeLayoutPage}
          options={pageOptions}
          selected={layoutPage}
        />
        <SaveOptions />
      </StickyHeader.Header>
    }
  >
    Coming soon
  </StickyHeader.Wrapper>
);

export default connect(
  (state: ReducerType) => ({layoutPage: state.layoutPage}),
  dispatch => ({changeLayoutPage: name => dispatch(changeLayoutPage(name))}),
)(LayoutPanel);
