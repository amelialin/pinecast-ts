import {connect} from 'react-redux';
import * as React from 'react';

import Button, {ButtonGroup} from '../common/Button';
import Dialog from '../common/Dialog';
import Label from '../common/Label';
import {Page} from './types';
import {ReducerType} from '../reducer';
import SlugInput from '../common/SlugInput';
import TextInput from '../common/TextInput';
import xhr from '../data/xhr';

class PageEditorModal extends React.PureComponent {
  props: {
    editorComponent: React.ComponentType<{
      onChange: (value: string) => void;
      value: string;
    }>;
    onClose: () => void;
    onSave: (newPage: Page) => void;
    page: Page;
    showSlug?: boolean;

    slug: string;
  };
  state: {
    rawValue: string;
    title: string;
    slug: string | null;
  } = {
    rawValue: '',
    title: '',
    slug: null,
  };

  componentDidMount() {
    const {page} = this.props;
    this.setState({
      title: page.title,
      rawValue: page.body,
      slug: page.slug || null,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.page.slug !== this.props.page.slug) {
      this.setState({
        title: newProps.page.title,
        slug: newProps.page.slug,
        rawValue: newProps.page.body,
      });
    }
  }

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

  handleChange = (newValue: string) => {
    this.setState({rawValue: newValue});
  };

  handleSave = () => {
    const {onSave, page} = this.props;
    onSave({
      ...page,
      body: this.state.rawValue,
      slug: page.slug || this.state.slug || '',
      title: this.state.title,
    });
  };

  handleTitleChange = (newTitle: string) => {
    this.setState({title: newTitle});
  };

  slugProvider = (newSlug: string) => {
    let abortResolve;
    const abortPromise = new Promise(resolve => {
      abortResolve = resolve;
    });

    const promise = xhr({
      method: 'GET',
      url: `/dashboard/sites/options/${encodeURIComponent(
        this.props.slug,
      )}/pages/slug_available?slug=${encodeURIComponent(newSlug)}`,
    })
      .then(resp => JSON.parse(resp))
      .then(parsed => (parsed.valid ? 'available' : 'unavailable'));

    return {status: promise, abort: abortResolve};
  };
  handleSlugChange = (newSlug: string) => {
    //
  };

  render() {
    const {editorComponent: EditorComponent, page, showSlug} = this.props;
    const {rawValue, slug, title} = this.state;
    return (
      <Dialog
        actions={this.renderActions()}
        title={page.title ? `Edit: ${page.title}` : 'New page'}
      >
        <Label $oneLine text="Page Title">
          <TextInput onChange={this.handleTitleChange} value={title} />
        </Label>
        {showSlug && (
          <Label $oneLine text="Slug">
            <SlugInput
              onChange={this.handleSlugChange}
              provider={this.slugProvider}
              sourceValue={this.state.title}
              value={slug || ''}
            />
          </Label>
        )}
        <EditorComponent onChange={this.handleChange} value={rawValue} />
      </Dialog>
    );
  }
}

export default connect((state: ReducerType) => ({
  slug: state.slug,
}))(PageEditorModal);
