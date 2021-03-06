import {connect} from 'react-redux';
import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Dialog from '@pinecast/common/Dialog';
import Label from '@pinecast/common/Label';
import SlugInput, {Status as SlugStatus} from '@pinecast/common/SlugInput';
import TextInput from '@pinecast/common/TextInput';
import xhr from '@pinecast/xhr';

import {Page} from './types';
import {ReducerType} from '../../reducer';

type Props = {
  editorComponent: React.ComponentType<{
    onChange: (value: Page['body']) => void;
    value: Page['body'];
  }>;
  onClose: () => void;
  onSave: (newPage: Page) => void;
  page: Page;
  showSlug?: boolean;
};

class PageEditorModal extends React.PureComponent {
  props: Props & {
    slug: string;
  };
  state: {
    rawValue: Page['body'];
    title: string;
    titleError: JSX.Element | string | null;
    slug: string | null;
    slugError: JSX.Element | string | null;
    slugStatus: SlugStatus;
  };

  constructor(props: PageEditorModal['props']) {
    super(props);
    const {page} = props;
    this.state = {
      rawValue: page.body,
      title: page.title,
      titleError: null,
      slug: page.slug || null,
      slugError: null,
      slugStatus: 'waiting',
    };
  }

  componentWillReceiveProps(newProps: PageEditorModal['props']) {
    if (newProps.page.slug !== this.props.page.slug) {
      this.setState({
        title: newProps.page.title,
        slug: newProps.page.slug,
        rawValue: newProps.page.body,
      });
    }
  }

  handleSave = () => {
    const {title, slug, slugStatus} = this.state;
    if (!title) {
      this.setState({titleError: 'A title is required.'});
      return;
    }
    if (this.props.showSlug) {
      if (!slug) {
        this.setState({slugError: 'A slug is required.'});
        return;
      }
      if (slugStatus === 'unavailable') {
        this.setState({slugError: 'You must choose a different slug.'});
        return;
      }
      if (slugStatus !== 'available') {
        this.setState({slugError: 'Please choose a different slug.'});
        return;
      }
    }

    const {onSave, page} = this.props;
    onSave({
      ...page,
      body: this.state.rawValue,
      slug: page.slug || this.state.slug || '',
      title: this.state.title,
    });
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

  handleChange = (newValue: Page['body']) => {
    this.setState({rawValue: newValue});
  };

  handleTitleChange = (newTitle: string) => {
    this.setState({title: newTitle, titleError: null});
  };

  slugProvider = (newSlug: string) => {
    let abortResolve: () => void = () => {};
    const abortPromise = new Promise<void>(resolve => {
      abortResolve = resolve;
    });

    const promise = xhr({
      abortPromise,
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
    this.setState({slug: newSlug, slugError: null});
  };
  handleSlugStatusChange = (newStatus: SlugStatus) => {
    this.setState({slugStatus: newStatus});
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.handleSave();
  };

  render() {
    const {editorComponent: EditorComponent, page, showSlug} = this.props;
    const {rawValue, slug, slugError, title, titleError} = this.state;
    return (
      <Dialog
        actions={this.renderActions()}
        title={page.title ? `Edit: ${page.title}` : 'New page'}
      >
        <form onSubmit={this.handleSubmit}>
          <Label
            $oneLine
            $oneLineCollapse={!showSlug}
            error={titleError}
            text="Page Title"
          >
            <TextInput
              invalid={Boolean(titleError)}
              onChange={this.handleTitleChange}
              required
              value={title}
            />
          </Label>
          {showSlug && (
            <Label $oneLine error={slugError} text="Slug">
              <SlugInput
                onChange={this.handleSlugChange}
                onStatusChanged={this.handleSlugStatusChange}
                provider={this.slugProvider}
                required
                sourceValue={this.state.title}
                value={slug || ''}
              />
            </Label>
          )}
          <EditorComponent onChange={this.handleChange} value={rawValue} />
        </form>
      </Dialog>
    );
  }
}

export default (connect((state: ReducerType) => ({
  slug: state.slug,
}))(PageEditorModal) as any) as React.ComponentType<Props>;
