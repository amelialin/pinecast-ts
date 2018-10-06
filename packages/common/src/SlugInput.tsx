import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import styled from '@pinecast/styles';

import TextInput, {Props as TextInputProps} from './TextInput';

const messages = defineMessages({
  available: {
    id: 'common.SlugInput.state.available',
    description: 'Message shown when a slug is available',
    defaultMessage: 'Slug is available',
  },
  unavailable: {
    id: 'common.SlugInput.state.unavailable',
    description: 'Message shown when a slug is unavailable',
    defaultMessage: 'Slug is unavailable',
  },
  failed: {
    id: 'common.SlugInput.state.failed',
    description: 'Message shown when Pinecast could not be contacted',
    defaultMessage: 'Error contacting Pinecast',
  },
  loading: {
    id: 'common.SlugInput.state.loading',
    description: 'Message shown while loading slug availability',
    defaultMessage: 'Checking…',
  },
});

const StatusWrapper = styled('span', ({$type}: {$type?: string}) => ({
  alignItems: 'center',
  color:
    $type === 'positive'
      ? '#000'
      : $type === 'negative'
        ? '#bf1d1d'
        : '#44484d',
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

export type Status =
  | 'waiting'
  | 'loading'
  | 'failed'
  | 'available'
  | 'unavailable';

export function slugify(input: string): string {
  const out = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/--+$/, '-')
    .replace(/^-+/, '');
  return out;
}

export default class SlugInput extends React.PureComponent {
  props: TextInputProps & {
    onStatusChanged: (status: Status) => void;
    provider: ProviderType;
    sourceValue: string;
  };
  state: {
    response: Status;
    tentativeSlug: string;
  } = {
    response: 'waiting',
    tentativeSlug: '',
  };

  pendingRequest: any | null = null;
  ongoingRequest: ProviderResponse | null = null;

  componentDidMount() {
    const cleanedSoruce = slugify(this.props.sourceValue);
    if (cleanedSoruce === this.props.value) {
      this.triggerLookup(cleanedSoruce);
    }
  }
  componentWillReceiveProps({sourceValue, value}: SlugInput['props']) {
    if (
      // The source value has changed
      sourceValue !== this.props.sourceValue &&
      // and our current tentative slug is based on the previous source value
      // or is empty
      (slugify(this.props.sourceValue) === this.state.tentativeSlug ||
        this.state.tentativeSlug === '')
    ) {
      // The previous input was the one we were showing
      // replace the value that's there
      const cleaned = slugify(sourceValue);
      if (cleaned !== this.state.tentativeSlug) {
        this.setState({tentativeSlug: cleaned});
        if (this.props.onChange) {
          this.props.onChange(cleaned);
        }
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
      const cleaned = slugify(value);
      this.setState({tentativeSlug: cleaned});
      this.triggerLookup(cleaned);
    }
  }
  display(value: string) {
    this.setState({tentativeSlug: slugify(value)});
  }

  handleChange = (newSlug: string) => {
    const filteredSlug = slugify(newSlug);
    this.setState({tentativeSlug: filteredSlug});
    if (this.props.onChange) {
      this.props.onChange(filteredSlug);
    }
    this.triggerLookup(filteredSlug);
  };

  changeStatus(newStatus: Status) {
    this.setState({response: newStatus});
    this.props.onStatusChanged(newStatus);
  }

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
      this.changeStatus('waiting');
      return;
    }
    this.changeStatus('loading');

    this.pendingRequest = setTimeout(() => {
      this.pendingRequest = null;
      this.ongoingRequest = this.props.provider(slug);
      this.ongoingRequest.status.then(
        response => {
          this.changeStatus(response);
        },
        () => {
          this.changeStatus('failed');
        },
      );
    }, 500);
  }

  renderSuffix() {
    switch (this.state.response) {
      case 'available':
        return (
          <StatusWrapper $type="positive">
            <FormattedMessage {...messages.available} />
          </StatusWrapper>
        );
      case 'unavailable':
        return (
          <StatusWrapper $type="negative">
            <FormattedMessage {...messages.unavailable} />
          </StatusWrapper>
        );
      case 'failed':
        return (
          <StatusWrapper>
            <FormattedMessage {...messages.failed} />
          </StatusWrapper>
        );
      case 'loading':
        return (
          <StatusWrapper>
            <FormattedMessage {...messages.loading} />
          </StatusWrapper>
        );
    }
    return undefined;
  }

  getEndCapStyle() {
    switch (this.state.response) {
      case 'available':
        return {
          backgroundColor: '#d0f9e6',
          color: '#000',
        };
      case 'unavailable':
        return {
          backgroundColor: '#fedede',
          color: '#bf1d1d',
        };
      case 'failed':
      case 'loading':
        return {};
      default:
        return undefined;
    }
  }

  render() {
    const {
      onChange,
      onStatusChanged,
      provider,
      sourceValue,
      value,
      ...rest
    } = this.props;
    void onChange;
    void onStatusChanged;
    void provider;
    void sourceValue;

    return (
      <TextInput
        endCapStyle={this.getEndCapStyle()}
        onChange={this.handleChange}
        value={this.state.tentativeSlug || value}
        {...rest}
        suffix={this.renderSuffix()}
      />
    );
  }
}
