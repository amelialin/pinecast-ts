import {Provider} from 'react-redux';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {ClientStyletron, StyletronProvider, styled} from '@pinecast/sb-styles';

import OptionsPanel from './OptionsPanel';
import PreviewPanel from './PreviewPanel';
import {store} from './reducer';
import Toolbar from './Toolbar';

const styletron = new ClientStyletron();

const HeightWrapper = styled('div', {height: '100%'});
const BelowToolbar = styled('div', {
  display: 'flex',
  height: 'calc(100% - 50px)',
});

export default class App extends React.PureComponent {
  render() {
    return (
      <StyletronProvider styletron={styletron}>
        <Provider store={store}>
          <HeightWrapper>
            <Toolbar />
            <BelowToolbar>
              <OptionsPanel />
              <PreviewPanel />
            </BelowToolbar>
          </HeightWrapper>
        </Provider>
      </StyletronProvider>
    );
  }
}
