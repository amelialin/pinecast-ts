import {Provider as ReduxProvider} from 'react-redux';
import * as React from 'react';

import {ClientStyletron, StyletronProvider, styled} from '@pinecast/styles';
import {Provider as IntlProvider} from '@pinecast/i18n';

import OptionsPanel from './OptionsPanel';
import Preview from './preview';
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
    isPro: boolean;
    slug: string;
    theme: Object;
  };

  componentWillMount() {
    store.dispatch({type: 'init', payload: {...this.props}});
  }

  render() {
    return (
      <StyletronProvider styletron={styletron}>
        <IntlProvider locale="en">
          <ReduxProvider store={store}>
            <HeightWrapper>
              <Toolbar />
              <BelowToolbar>
                <OptionsPanel />
                <Preview />
              </BelowToolbar>
            </HeightWrapper>
          </ReduxProvider>
        </IntlProvider>
      </StyletronProvider>
    );
  }
}
