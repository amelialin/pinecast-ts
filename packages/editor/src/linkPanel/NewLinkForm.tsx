import * as React from 'react';

import Button from '../common/Button';
import Form from '../common/Form';
import Label from '../common/Label';
import TextInput from '../common/TextInput';

export default class NewLinkForm extends React.PureComponent {
  props: {
    onNewLink: (title: string, url: string) => void;
  };

  state: {
    title: string;
    url: string;
  } = {title: '', url: ''};

  handleCreateSubmit = () => {
    if (!this.state.title || !this.state.url) {
      return;
    }

    this.props.onNewLink(this.state.title, this.state.url);
    this.setState({title: '', url: ''});
  };

  handleTitleChange = (value: string) => {
    this.setState({title: value});
  };
  handleURLChange = (value: string) => {
    this.setState({url: value});
  };

  render() {
    return (
      <Form onSubmit={this.handleCreateSubmit}>
        <Label text="Link title">
          <TextInput
            onChange={this.handleTitleChange}
            placeholder="Text your visitor will see"
            value={this.state.title}
          />
        </Label>
        <Label text="Link URL">
          <TextInput
            onChange={this.handleURLChange}
            placeholder="https://"
            value={this.state.url}
          />
        </Label>
        <Button $isBlock $isPrimary type="submit">
          Create
        </Button>
      </Form>
    );
  }
}
