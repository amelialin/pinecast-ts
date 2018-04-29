import * as React from 'react';

import Button from '@pinecast/common/Button';
import Form from '@pinecast/common/Form';
import Label from '@pinecast/common/Label';
import TextInput from '@pinecast/common/TextInput';

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
      <Form onSubmit={this.handleCreateSubmit} style={{marginBottom: 20}}>
        <Label text="Link title">
          <TextInput
            maxLength={250}
            name="title"
            onChange={this.handleTitleChange}
            placeholder="Text your visitor will see"
            required
            value={this.state.title}
          />
        </Label>
        <Label text="Link URL">
          <TextInput
            maxLength={500}
            name="url"
            onChange={this.handleURLChange}
            placeholder="https://"
            required
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
