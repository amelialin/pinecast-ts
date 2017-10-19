import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {ReducerType} from './reducer';
import * as Panels from './panels';

const Wrapper = styled('div', {flex: '1 1', height: '100%'});

const OptionsPanel = ({page}: {page: ReducerType['page']}) => (
  <Wrapper>
    {page === 'presets' && <Panels.PresetsPanel />}
    {page === 'colors' && <Panels.ColorsPanel />}
  </Wrapper>
);

export default connect((state: ReducerType) => ({
  page: state.page,
}))(OptionsPanel);
