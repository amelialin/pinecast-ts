import * as React from 'react';

import Label from '@pinecast/common/Label';
import TextInput from '@pinecast/common/TextInput';
import {ContactBody} from './types';

export default class ContactFields extends React.PureComponent {
  props: {
    onChange: (value: ContactBody) => void;
    value: ContactBody;
  };

  changed(field: string, value: string) {
    const updated = {...this.props.value, [field]: value || undefined};
    this.props.onChange(updated);
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
            maxLength={64}
            onChange={this.handleEmailChange}
            placeholder="contact@mygreatshow.com"
            type="email"
            value={this.props.value.email || ''}
          />
        </Label>
        <Label text="Twitter">
          <TextInput
            maxLength={32}
            onChange={this.handleTwitterChange}
            placeholder="mygreatshow"
            prefix="@"
            value={this.props.value.twitter || ''}
          />
        </Label>
        <Label text="Facebook">
          <TextInput
            maxLength={256}
            onChange={this.handleFacebookChange}
            placeholder="https://www.facebook.com/mygreatshow/"
            value={this.props.value.facebook || ''}
          />
        </Label>
        <Label text="Instagram">
          <TextInput
            maxLength={32}
            onChange={this.handleInstagramChange}
            placeholder="mygreatshow"
            prefix="@"
            value={this.props.value.instagram || ''}
          />
        </Label>
        <Label text="Twitch">
          <TextInput
            maxLength={32}
            onChange={this.handleTwitchChange}
            placeholder="mygreatshow"
            prefix="https://www.twitch.tv/"
            value={this.props.value.twitch || ''}
          />
        </Label>
        <Label text="YouTube">
          <TextInput
            maxLength={32}
            onChange={this.handleYoutubeChange}
            placeholder="mygreatshow"
            prefix="https://www.youtube.com/"
            value={this.props.value.youtube || ''}
          />
        </Label>
      </React.Fragment>
    );
  }
}
