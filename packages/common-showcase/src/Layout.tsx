import * as React from 'react';

import Group from '@pinecast/common/Group';
import {Pinecast} from '@pinecast/common/icons';
import styled from '@pinecast/styles';

import ComponentList from './ComponentList';
import Renderer from './Renderer';

const Body = styled('main', {
  display: 'grid',
  height: '100%',
  gridTemplateRows: 60,
  gridTemplateColumns: 300,
});

const Header = styled('header', {
  alignItems: 'center',
  backgroundColor: '#fff',
  borderBottom: '1px solid #eeefea',
  color: '',
  display: 'flex',
  height: 60,
  gridColumn: '1 / 3',
  gridRow: '1 / 2',
  padding: '0 20px',
});

const Sidebar = styled('aside', {
  gridColumn: '1 / 2',
  gridRow: '2 / 3',
});
const Rendering = styled('section', {
  gridColumn: '2 / 3',
  gridRow: '2 / 3',
});

const Logo = styled('span', {fontWeight: 500});

export default class Layout extends React.Component {
  state: {component: string | null} = {
    component: localStorage.getItem('lastComponent'),
  };

  handleSet = (component: string) => {
    this.setState({component});
    localStorage.setItem('lastComponent', component);
  };

  render() {
    return (
      <Body>
        <Header>
          <Group spacing={12}>
            <Pinecast color="#1fd2c4" height={20} />
            <Logo>Common</Logo>
          </Group>
        </Header>
        <Sidebar>
          <ComponentList
            onSet={this.handleSet}
            selected={this.state.component || ''}
          />
        </Sidebar>
        <Rendering>
          {this.state.component && <Renderer selected={this.state.component} />}
        </Rendering>
      </Body>
    );
  }
}
