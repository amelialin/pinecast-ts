import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {Check, Cross} from '../common/icons';
import TextInput, {Props} from './TextInput';

const StatusWrapper = styled('span', ({$type}: {$type?: string}) => ({
  alignItems: 'center',
  color:
    $type === 'positive'
      ? '#259461'
      : $type === 'negative' ? '#bf1d1d' : '#44484d',
  display: 'inline-flex',
  whiteSpace: 'nowrap',

  ':not(:empty) svg': {
    marginRight: 8,
  },
}));

type ProviderResponse = {
  status: Promise<'available' | 'unavailable'>;
  abort: () => void;
};
export type ProviderType = (slug: string) => ProviderResponse;

export default class SlugInput extends React.PureComponent {
  props: Props & {
    provider: ProviderType;
    sourceValue: string;
  };
  state: {
    response: 'waiting' | 'loading' | 'failed' | 'available' | 'unavailable';
    tentativeSlug: string;
  } = {
    response: 'waiting',
    tentativeSlug: '',
  };

  pendingRequest: number | null = null;
  ongoingRequest: ProviderResponse | null = null;

  componentWillReceiveProps({sourceValue, value}) {
    if (
      // The source value has changed
      sourceValue !== this.props.sourceValue &&
      // and our current tentative slug is based on the previous source value
      // or is empty
      (this.clean(this.props.sourceValue) === this.state.tentativeSlug ||
        this.state.tentativeSlug === '')
    ) {
      // The previous input was the one we were showing
      // replace the value that's there
      const cleaned = this.clean(sourceValue);
      if (cleaned !== this.state.tentativeSlug) {
        this.setState({tentativeSlug: cleaned});
        this.props.onChange(cleaned);
        this.triggerLookup(cleaned);
        return;
      }
    }
    if (
      // The value has changed
      value !== this.props.value &&
      // and the new value doesn't reflect the tentative value
      value !== this.state.tentativeSlug
    ) {
      const cleaned = this.clean(value);
      this.setState({tentativeSlug: cleaned});
      this.triggerLookup(cleaned);
    }
  }

  clean(input: string): string {
    return input
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/--+$/, '-');
  }
  display(value: string) {
    this.setState({tentativeSlug: this.clean(value)});
  }

  handleChange = (newSlug: string) => {
    const filteredSlug = this.clean(newSlug);
    this.setState({tentativeSlug: filteredSlug});
    this.props.onChange(filteredSlug);
    this.triggerLookup(filteredSlug);
  };

  triggerLookup(slug: string) {
    if (this.ongoingRequest) {
      this.ongoingRequest.abort();
      this.ongoingRequest = null;
    }
    if (this.pendingRequest) {
      clearTimeout(this.pendingRequest);
      this.pendingRequest = null;
    }

    if (!slug) {
      this.setState({response: 'waiting'});
      return;
    }
    this.setState({response: 'loading'});

    this.pendingRequest = setTimeout(() => {
      this.pendingRequest = null;
      this.ongoingRequest = this.props.provider(slug);
      this.ongoingRequest.status.then(
        response => {
          this.setState({response});
        },
        () => {
          this.setState({response: 'failed'});
        },
      );
    }, 500);
  }

  renderSuffix() {
    switch (this.state.response) {
      case 'available':
        return (
          <StatusWrapper $type="positive">
            <Check color="#51D197" />
            Slug is available
          </StatusWrapper>
        );
      case 'unavailable':
        return (
          <StatusWrapper $type="negative">
            <Cross color="#EF6B6B" />
            Slug is not available
          </StatusWrapper>
        );
      case 'failed':
        return <StatusWrapper>Error contacting Pinecast</StatusWrapper>;
      case 'loading':
        return <StatusWrapper>Checking slug…</StatusWrapper>;
    }
  }

  render() {
    const {onChange, provider, sourceValue, value, ...rest} = this.props;
    return (
      <TextInput
        onChange={this.handleChange}
        value={this.state.tentativeSlug || value}
        {...rest}
        suffix={this.renderSuffix()}
      />
    );
  }
}
