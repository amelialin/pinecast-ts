import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const Section = styled('section');
const TabWrapper = styled('div', {
  padding: '20px 0',
});

export class Tab extends React.PureComponent {
  props: {
    children?: React.ReactNode;
    name: React.ReactNode;
  };

  render() {
    return <TabWrapper>{this.props.children}</TabWrapper>;
  }
}

const TabButtonWrapper = styled('div', {
  borderBottom: '1px solid #8d52d1',
  display: 'flex',
});
const TabButton = styled(
  'button',
  ({$isActive}: {$isActive: boolean}) => ({
    appearance: 'none',
    background: 'transparent',
    border: 0,
    color: $isActive ? '#8d52d1' : '#666',
    display: 'block',
    flex: '0 0',
    fontFamily: DEFAULT_FONT,
    fontSize: 16,
    fontWeight: $isActive ? 500 : 400,
    height: 36,
    marginRight: 30,
    padding: 0,
    whiteSpace: 'nowrap',
  }),
  {type: 'button'},
);

export default class Tabs extends React.Component {
  props: {
    children: Array<JSX.Element>;
    style?: CSS;
  };
  state: {selectedTab: number} = {selectedTab: 0};

  handleClick = (idx: number) => () => {
    this.setState({selectedTab: idx});
  };

  render() {
    return (
      <Section style={this.props.style}>
        <TabButtonWrapper>
          {React.Children.map(this.props.children, (child: any, idx) => (
            <TabButton
              $isActive={idx === this.state.selectedTab}
              onClick={this.handleClick(idx)}
              key={idx}
            >
              {(child as Tab).props.name}
            </TabButton>
          ))}
        </TabButtonWrapper>
        {React.Children.map(
          this.props.children,
          (child, idx) => (idx === this.state.selectedTab ? child : null),
        )}
      </Section>
    );
  }
}
