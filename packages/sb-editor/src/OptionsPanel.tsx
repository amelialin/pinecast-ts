import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/styles';

import AssetsPanel from './assetsPanel';
import LayoutPanel from './layoutPanel';
import ContentPanel from './contentPanel';
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
    {page === 'content' && <ContentPanel />}
    {page === 'assets' && <AssetsPanel />}
    {page === 'settings' && <SettingsPanel />}
  </Wrapper>
);

export default connect((state: ReducerType) => ({
  page: state.page,
}))(OptionsPanel);
