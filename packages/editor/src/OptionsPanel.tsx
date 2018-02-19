import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import AssetsPanel from './assetsPanel';
import LayoutPanel from './layoutPanel';
import LinkPanel from './linkPanel';
import PagesPanel from './pagesPanel';
import {ReducerType} from './reducer';
import SettingsPanel from './settingsPanel';
import ThemePanel from './themePanels';

const Wrapper = styled('div', {
  flex: '0 1 600px',
  height: '100%',
  overflowY: 'auto',
});

const OptionsPanel = ({page}: {page: ReducerType['page']}) => (
  <Wrapper>
    {page === 'theme' && <ThemePanel />}
    {page === 'layout' && <LayoutPanel />}
    {page === 'links' && <LinkPanel />}
    {page === 'pages' && <PagesPanel />}
    {page === 'assets' && <AssetsPanel />}
    {page === 'settings' && <SettingsPanel />}
  </Wrapper>
);

export default connect((state: ReducerType) => ({
  page: state.page,
}))(OptionsPanel);
