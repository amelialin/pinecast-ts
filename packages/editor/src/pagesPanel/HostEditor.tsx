import * as React from 'react';

import styled from '@pinecast/sb-styles';

import Button, {ButtonGroup} from '../common/Button';
import Label from '../common/Label';
import TextInput from '../common/TextInput';
import {Host} from './types';

const MiniToolbar = styled('div', {
  marginBottom: 20,
});

export default class HostEditor extends React.PureComponent {
  props: {
    canDelete: boolean;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    onChange: (index: number, value: Host) => void;
    onChangeIndex: (index: number, newIndex: number) => void;
    onDelete: (index: number) => void;
    value: Host;
  };

  changed(field: string, value: string) {
    this.props.onChange(this.props.index, {
      ...this.props.value,
      [field]: value ? (field === 'name' ? value : [value]) : undefined,
    });
  }

  handleNameChange = (name: string) => this.changed('name', name);
  handleEmailChange = (email: string) => this.changed('email', email);
  handleTwitterChange = (twitter: string) => this.changed('twitter', twitter);
  handleFacebookChange = (facebook: string) =>
    this.changed('facebook', facebook);
  handleInstagramChange = (ig: string) => this.changed('instagram', ig);
  handleTwitchChange = (twitch: string) => this.changed('twitch', twitch);
  handleYoutubeChange = (youtube: string) => this.changed('youtube', youtube);

  handleDelete = () => {
    this.props.onDelete(this.props.index);
  };
  handleMoveDown = () => {
    this.props.onChangeIndex(this.props.index, this.props.index + 1);
  };
  handleMoveUp = () => {
    this.props.onChangeIndex(this.props.index, this.props.index - 1);
  };

  getValue(field: string): string {
    if (!this.props.value[field]) {
      return '';
    }
    return this.props.value[field][0] || '';
  }

  render() {
    return (
      <React.Fragment>
        <Label text="Name">
          <TextInput
            maxLength={64}
            onChange={this.handleNameChange}
            placeholder="Ron Johnson"
            required
            value={this.props.value.name}
          />
        </Label>
        {(!(this.props.isFirst && this.props.isLast) ||
          this.props.canDelete) && (
          <MiniToolbar>
            <ButtonGroup>
              {this.props.canDelete && (
                <Button onClick={this.handleDelete} size="small">
                  Delete host
                </Button>
              )}
              {!this.props.isFirst && (
                <Button onClick={this.handleMoveUp} size="small">
                  Move up
                </Button>
              )}
              {!this.props.isLast && (
                <Button onClick={this.handleMoveDown} size="small">
                  Move down
                </Button>
              )}
            </ButtonGroup>
          </MiniToolbar>
        )}
        <Label $oneLine text="Gravatar email">
          <TextInput
            maxLength={64}
            onChange={this.handleEmailChange}
            placeholder="ron@mygreatshow.com"
            type="email"
            value={this.getValue('email')}
          />
        </Label>
        <Label $oneLine text="Twitter">
          <TextInput
            maxLength={32}
            onChange={this.handleTwitterChange}
            placeholder="mygreatshow"
            prefix="@"
            value={this.getValue('twitter')}
          />
        </Label>
        <Label $oneLine text="Facebook">
          <TextInput
            maxLength={256}
            onChange={this.handleFacebookChange}
            placeholder="https://www.facebook.com/mygreatshow/"
            value={this.getValue('facebook')}
          />
        </Label>
        <Label $oneLine text="Instagram">
          <TextInput
            maxLength={32}
            onChange={this.handleInstagramChange}
            placeholder="mygreatshow"
            prefix="@"
            value={this.getValue('instagram')}
          />
        </Label>
        <Label $oneLine text="Twitch">
          <TextInput
            maxLength={32}
            onChange={this.handleTwitchChange}
            placeholder="mygreatshow"
            prefix="https://www.twitch.tv/"
            value={this.getValue('twitch')}
          />
        </Label>
        <Label $oneLine text="YouTube">
          <TextInput
            maxLength={32}
            onChange={this.handleYoutubeChange}
            placeholder="mygreatshow"
            prefix="https://www.youtube.com/"
            value={this.getValue('youtube')}
          />
        </Label>
      </React.Fragment>
    );
  }
}
