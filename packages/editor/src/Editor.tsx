import {Provider as ReduxProvider} from 'react-redux';
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

export default class Editor extends React.PureComponent {
  props: {
    csrf: string;
    slug: string;
    theme: Object;
  };

  componentWillMount() {
    store.dispatch({type: 'init', payload: {...this.props}});
  }

  render() {
    return (
      <StyletronProvider styletron={styletron}>
        <ReduxProvider store={store}>
          <HeightWrapper>
            <Toolbar />
            <BelowToolbar>
              <OptionsPanel />
              <PreviewPanel />
            </BelowToolbar>
          </HeightWrapper>
        </ReduxProvider>
      </StyletronProvider>
    );
  }
}
