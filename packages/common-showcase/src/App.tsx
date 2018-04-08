import * as React from 'react';

import {ClientStyletron, StyletronProvider} from '@pinecast/styles';

import Layout from './Layout';

const styletron = new ClientStyletron();

export default class App extends React.Component {
  render() {
    return (
      <StyletronProvider styletron={styletron}>
        <Layout />
      </StyletronProvider>
    );
  }
}
