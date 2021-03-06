import * as React from 'react';

import Group from '@pinecast/common/Group';
import {Pinecast} from '@pinecast/common/icons';
import styled from '@pinecast/styles';

import ComponentList from './ComponentList';
import Renderer from './Renderer';

const Body = styled('main', {
  height: '100%',
});

const Header = styled('header', {
  alignItems: 'center',
  backgroundColor: '#fff',
  borderBottom: '1px solid #eeefea',
  color: '',
  display: 'flex',
  height: 60,
  padding: '0 20px',
});
const BodyWrapper = styled('div', {
  display: 'flex',
  height: 'calc(100% - 60px)',
});
const Sidebar = styled('aside', {
  borderRight: '1px solid #eeefea',
  flex: '0 0 300px',
  height: '100%',
  overflowY: 'auto',
  overflow: 'auto',
  padding: 12,
});
const Rendering = styled('section', {
  backgroundColor: '#f5f5f5',
  flex: '1 1',
  height: '100%',
  overflowY: 'auto',
  padding: 20,
});

const Logo = styled('span', {fontSize: 18, fontWeight: 500});

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
        <BodyWrapper>
          <Sidebar>
            <ComponentList
              onSet={this.handleSet}
              selected={this.state.component || ''}
            />
          </Sidebar>
          <Rendering>
            {this.state.component && (
              <Renderer
                key={this.state.component}
                selected={this.state.component}
              />
            )}
          </Rendering>
        </BodyWrapper>
      </Body>
    );
  }
}
