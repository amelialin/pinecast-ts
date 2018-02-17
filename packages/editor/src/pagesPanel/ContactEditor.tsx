import * as React from 'react';
import {ReactMdeTypes} from 'react-mde';

import Button, {ButtonGroup} from '../common/Button';
import Dialog from '../common/Dialog';
import Label from '../common/Label';
import TextInput from '../common/TextInput';
import {ContactBody, Page} from './types';

import 'react-mde/lib/styles/css/react-mde-all.css';

export default class ContactEditor extends React.PureComponent {
  props: {
    onClose: () => void;
    onSave: (newPage: Page) => void;
    page: Page;
  };
  state: ContactBody & {
    title: string;
  } = {
    title: '',

    email: '',
    twitter: '',
    facebook: '',
    instagram: '',
    twitch: '',
    youtube: '',
  };

  renderActions() {
    return (
      <ButtonGroup>
        <Button onClick={this.props.onClose}>Cancel</Button>
        <Button $isPrimary onClick={this.handleSave}>
          Save
        </Button>
      </ButtonGroup>
    );
  }

  handleSave = () => {
    this.props.onSave({
      ...this.props.page,
      title: this.state.title,
    });
  };

  handleTitleChange = (newTitle: string) => {
    this.setState({title: newTitle});
  };

  render() {
    const {page} = this.props;
    const {title} = this.state;
    return (
      <Dialog actions={this.renderActions()} title={`Edit: ${page.title}`}>
        //
      </Dialog>
    );
  }
}
