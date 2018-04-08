import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import styled from '@pinecast/styles';

const ExampleTitle = styled('h2', {
  fontSize: 24,
  fontWeight: 400,
  margin: '0 0 20px',
});

const Surface = styled('div', ({$dark}: {$dark: boolean}) => ({
  backgroundColor: $dark ? '#111' : '#fff',
  backgroundImage:
    'linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 75%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05)), ' +
    'linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 75%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05))',
  backgroundPosition: '0 0, 12px 12px',
  backgroundSize: '24px 24px',
  border: '1px solid #c6caca',
  borderRadius: 3,
  margin: '0 0 12px',
  padding: 32,
  width: '100%',
}));

const Code = styled('code', {
  border: '1px solid #c6caca',
  borderRadius: 3,
  fontFamily: 'Input, monospace',
  marginTop: 12,
  overflowX: 'scroll',
  padding: 12,
  whiteSpace: 'pre',
  width: 700,
});

export default class Example extends React.Component {
  props: {children: () => JSX.Element; dark?: boolean; title: string};
  state: {showingCode: boolean} = {showingCode: false};

  handleToggleCode = () => {
    this.setState({showingCode: !this.state.showingCode});
  };

  render() {
    return (
      <Card style={{alignItems: 'flex-start', marginTop: 12}} whiteBack>
        <ExampleTitle>{this.props.title}</ExampleTitle>
        <Surface $dark={this.props.dark}>{this.props.children()}</Surface>
        <Button onClick={this.handleToggleCode} size="small">
          {this.state.showingCode ? 'Hide code' : 'Show code'}
        </Button>
        {this.state.showingCode && (
          <Code>{this.props.children.toString()}</Code>
        )}
      </Card>
    );
  }
}
