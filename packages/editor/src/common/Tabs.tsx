import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';

const TabWrapper = styled('div', {
  padding: '30px 0',
});

export class Tab extends React.PureComponent {
  props: {
    children?: Array<JSX.Element | Array<JSX.Element>> | JSX.Element | string;
    name: string;
  };

  render() {
    return <TabWrapper>{this.props.children}</TabWrapper>;
  }
}

const TabButtonWrapper = styled('div', {
  borderBottom: '1px solid #52d1c7',
  display: 'flex',
});
const TabButton = styled(
  'button',
  ({$isActive}) => ({
    appearance: 'none',
    background: '#fff',
    border: 0,
    color: $isActive ? '#52d1c7' : '#666',
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
  };
  state: {
    selectedTab: number;
  };

  constructor(props) {
    super(props);
    this.state = {selectedTab: 0};
  }

  handleClick = (idx: number) => () => {
    this.setState({selectedTab: idx});
  };

  render() {
    return (
      <section>
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
      </section>
    );
  }
}
