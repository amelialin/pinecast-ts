import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import LinkPaenl from './linkPanel';
import {ReducerType} from './reducer';
import ThemePanel from './themePanels';

const Wrapper = styled('div', {
  flex: '0 1 600px',
  height: '100%',
  overflowY: 'auto',
});

const OptionsPanel = ({page}: {page: ReducerType['page']}) => (
  <Wrapper>
    {page === 'theme' && <ThemePanel />}
    {page === 'links' && <LinkPaenl />}
  </Wrapper>
);

export default connect((state: ReducerType) => ({
  page: state.page,
}))(OptionsPanel);
