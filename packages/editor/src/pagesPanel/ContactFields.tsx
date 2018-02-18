import * as React from 'react';

import Label from '../common/Label';
import TextInput from '../common/TextInput';
import {ContactBody} from './types';

export default class ContactFields extends React.PureComponent {
  props: {
    onChange: (value: string) => void;
    value: string;
  };
  state: {
    rawValue: ContactBody;
    serialized: string;
  };

  constructor(props) {
    super(props);
    this.state = {
      rawValue: JSON.parse(props.value || '{}'),
      serialized: props.value || '{}',
    };
  }

  componentWillReceiveProps(props) {
    if (props.value && props.value !== this.state.serialized) {
      this.setState({
        serialized: props.value,
        rawValue: JSON.parse(props.value),
      });
    }
  }

  changed(field: string, value: string) {
    const updated = {...this.state.rawValue, [field]: value || undefined};
    const serialized = JSON.stringify(updated);
    this.setState({rawValue: updated, serialized});
    this.props.onChange(serialized);
  }

  handleEmailChange = (email: string) => this.changed('email', email);
  handleTwitterChange = (twitter: string) => this.changed('twitter', twitter);
  handleFacebookChange = (facebook: string) =>
    this.changed('facebook', facebook);
  handleInstagramChange = (ig: string) => this.changed('instagram', ig);
  handleTwitchChange = (twitch: string) => this.changed('twitch', twitch);
  handleYoutubeChange = (youtube: string) => this.changed('youtube', youtube);

  render() {
    return (
      <React.Fragment>
        <Label text="Podcast email">
          <TextInput
            onChange={this.handleEmailChange}
            placeholder="contact@mygreatshow.com"
            type="email"
            value={this.state.rawValue.email || ''}
          />
        </Label>
        <Label text="Twitter">
          <TextInput
            onChange={this.handleTwitterChange}
            placeholder="mygreatshow"
            prefix="@"
            value={this.state.rawValue.twitter || ''}
          />
        </Label>
        <Label text="Facebook">
          <TextInput
            onChange={this.handleFacebookChange}
            placeholder="https://www.facebook.com/mygreatshow/"
            value={this.state.rawValue.facebook || ''}
          />
        </Label>
        <Label text="Instagram">
          <TextInput
            onChange={this.handleInstagramChange}
            placeholder="mygreatshow"
            prefix="@"
            value={this.state.rawValue.instagram || ''}
          />
        </Label>
        <Label text="Twitch">
          <TextInput
            onChange={this.handleTwitchChange}
            placeholder="mygreatshow"
            prefix="https://www.twitch.tv/"
            value={this.state.rawValue.twitch || ''}
          />
        </Label>
        <Label text="YouTube">
          <TextInput
            onChange={this.handleYoutubeChange}
            placeholder="mygreatshow"
            prefix="https://www.youtube.com/"
            value={this.state.rawValue.youtube || ''}
          />
        </Label>
      </React.Fragment>
    );
  }
}
