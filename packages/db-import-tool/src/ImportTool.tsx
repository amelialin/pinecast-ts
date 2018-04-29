import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled from '@pinecast/styles';

import FormView from './FormView';
import ImportView from './ImportView';
import SourceSelector from './components/SourceSelector';

const Heading = styled('h1', {
  fontFamily: DEFAULT_FONT,
  fontSize: 24,
  fontWeight: 500,
  padding: '40px 0',
  textAlign: 'center',
});

export default class ImportTool extends React.Component {
  static selector = '.placeholder-import-tool';

  static propExtraction = {
    feedFetchURL: (e: HTMLElement) => e.getAttribute('data-feed-fetch-url'),
    formInner: (e: HTMLElement) => Array.from(e.childNodes),
    hasFormError: (e: HTMLElement) =>
      e.getAttribute('data-has-error') === 'true',
    isPaid: (e: HTMLElement) => e.getAttribute('data-plan') !== 'demo',
  };

  props: {
    feedFetchURL: string;
    formInner: HTMLCollection;
    hasFormError: boolean;
    isPaid: boolean;
  };
  state: {
    source: 'form' | 'import' | null;
  };

  constructor(props: ImportTool['props']) {
    super(props);
    this.state = {
      source: props.hasFormError ? 'form' : null,
    };
  }

  handleSourceChange = (newSource: 'form' | 'import') => {
    this.setState({source: newSource});
  };

  renderSourceSelect() {
    return (
      <SourceSelector
        source={this.state.source}
        onChange={this.handleSourceChange}
      />
    );
  }
  renderBody() {
    switch (this.state.source) {
      case 'form':
        return <FormView elements={this.props.formInner} />;
      case 'import':
        return (
          <ImportView
            feedFetchURL={this.props.feedFetchURL}
            isPaid={this.props.isPaid}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Heading>Add a new show to Pinecast</Heading>
        {this.renderSourceSelect()}
        {this.renderBody()}
      </React.Fragment>
    );
  }
}
