import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';

import MusicInfo from '../icons/music-info';

const messages = defineMessages({
  titleFilled: {
    id: 'db-uploader.AddMetadata.titleFilled',
    description:
      'Message shown when the user has entered a title which is to be prefilled in metadata',
    defaultMessage:
      "The title you've entered above will be written to the file's metadata.",
  },
  titleUnfilled: {
    id: 'db-uploader.AddMetadata.titleUnfilled',
    description:
      'Message shown when the user has not yet entered a title which is to be prefilled in metadata',
    defaultMessage:
      'Set a title in the field above. It will fill the title in the metadata.',
  },

  title: {
    id: 'db-uploader.AddMetadata.title',
    description: 'Title of the card to add metadata',
    defaultMessage: "Your file doesn't contain any metadata.",
  },
  prompt: {
    id: 'db-uploader.AddMetadata.prompt',
    description: 'Prompt for the user to add metadata to their audio file',
    defaultMessage:
      'Would you like us to automatically add it for you? This will show episode and podcast information in non-podcast apps.',
  },

  ctaAdd: {
    id: 'db-uploader.AddMetadata.ctaAdd',
    description: 'CTA to add metadata',
    defaultMessage: 'Add metadata',
  },
  ctaSkip: {
    id: 'db-uploader.AddMetadata.ctaSkip',
    description: 'CTA to skip the metadata step',
    defaultMessage: 'Skip',
  },
});

export default class AddMetadata extends React.PureComponent {
  props: {
    onAccept: () => void;
    onReject: () => void;
  };
  state: {isValid: boolean} = {isValid: false};
  targetComponent: HTMLInputElement = document.querySelector(
    'input[name=title]',
  ) as HTMLInputElement;

  componentDidMount() {
    this.targetComponent.addEventListener('input', this.onInput);
    this.setState({isValid: this.targetComponent.validity.valid});
  }

  componentWillUnmount() {
    this.targetComponent.removeEventListener('input', this.onInput);
  }

  onInput = (e: KeyboardEvent) => {
    this.setState({isValid: (e.target as HTMLInputElement).validity.valid});
  };

  renderTitleMonitor() {
    const style = {
      border: '2px solid #eee',
      borderRadius: 2,
      color: '#999',
      marginBottom: '1em',
      padding: '0 0.5em',
      transition: 'border 0.2s, color 0.2s',
    };
    if (this.state.isValid) {
      return (
        <div style={style}>
          <FormattedMessage {...messages.titleFilled} />
        </div>
      );
    } else {
      return (
        <div style={{...style, border: '2px solid #B75B5B', color: '#B75B5B'}}>
          <FormattedMessage {...messages.titleUnfilled} />
        </div>
      );
    }
  }
  render() {
    const {onAccept, onReject} = this.props;
    return (
      <Card style={{flexDirection: 'row'}} whiteBack>
        <MusicInfo
          width={46}
          height={46}
          style={{flex: '0 0 46px', marginRight: 15}}
        />
        <div>
          <b style={{display: 'block'}}>
            <FormattedMessage {...messages.title} />
          </b>
          <span style={{display: 'block', marginBottom: '0.5em'}}>
            <FormattedMessage {...messages.prompt} />
          </span>
          {this.renderTitleMonitor()}
          <ButtonGroup>
            <Button
              disabled={!this.state.isValid}
              onClick={onAccept}
              $isPrimary
            >
              <FormattedMessage {...messages.ctaAdd} />
            </Button>
            <Button onClick={onReject}>
              <FormattedMessage {...messages.ctaSkip} />
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    );
  }
}
