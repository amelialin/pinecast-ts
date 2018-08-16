import {connect} from 'react-redux';
import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import EmptyState from '@pinecast/common/EmptyState';
import ErrorState from '@pinecast/common/ErrorState';
import LoadingState from '@pinecast/common/LoadingState';
import ModalLayer from '@pinecast/common/ModalLayer';
import {Table, TableHeaderCell} from '@pinecast/common/Table';
import {url} from '@pinecast/common/helpers';
import xhr from '@pinecast/xhr';

import {changePath, refresh} from '../../actions/preview';
import ContactFields from './ContactFields';
import HostsFields from './HostsFields';
import PageEditorModal from './PageEditorModal';
import MarkdownEditor from './MarkdownEditor';
import {Page} from './types';
import PageTableRow from './PageTableRow';
import {PanelDescription, PanelWrapper} from '../../panelComponents';
import {ReducerType} from '../../reducer';
import request, {clearCache} from '../../data/requests';

class PagesPanel extends React.PureComponent {
  props: {
    onNavigate: (path: string) => any;
    onRefresh: () => any;
    path: string;
    slug: string;
  };
  state: {
    data: {[slug: string]: Page} | null;
    editing: string | null;
    error: string | null;
    new_: 'markdown' | 'contact' | 'hosts' | null;
  } = {
    data: null,
    editing: null,
    error: null,
    new_: null,
  };
  unmounted: boolean = false;

  componentWillMount() {
    const {slug} = this.props;
    request(url`/sites/site_builder/editor/pages/${slug}`)
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          if (this.unmounted) {
            return;
          }
          this.setState({data: parsed});
        },
        () => {
          if (this.unmounted) {
            return;
          }
          this.setState({error: 'Failed to load pages from Pinecast'});
        },
      );
  }
  componentWillUnmount() {
    this.unmounted = true;
  }

  handleNewMarkdown = () => this.setState({new_: 'markdown'});
  handleNewContact = () => this.setState({new_: 'contact'});
  handleNewHosts = () => this.setState({new_: 'hosts'});

  renderToolbar() {
    return (
      <ButtonGroup style={{marginBottom: 24}}>
        <Button size="small" onClick={this.handleNewMarkdown}>
          New Markdown page
        </Button>
        <Button size="small" onClick={this.handleNewContact}>
          New contact page
        </Button>
        <Button size="small" onClick={this.handleNewHosts}>
          New hosts page
        </Button>
      </ButtonGroup>
    );
  }

  handleDelete = (pageSlug: string) => {
    const data = this.state.data;
    if (!data) {
      return;
    }

    const newData = {...data};
    delete newData[pageSlug];
    this.setState({data: null, error: null});

    const {slug} = this.props;
    xhr({
      method: 'POST',
      url: url`/sites/site_builder/editor/pages/${slug}/${pageSlug}/delete`,
    }).then(
      () => {
        this.setState({data: newData});
        clearCache();
        this.props.onRefresh();

        if (this.props.path === '/' + encodeURIComponent(pageSlug)) {
          this.props.onNavigate('/');
        }
      },
      () => {
        this.setState({error: 'Could not contact Pinecast'});
      },
    );
  };

  handleEdit = (pageSlug: string) => {
    this.setState({editing: pageSlug});
  };

  renderInner() {
    const {data, error} = this.state;
    if (error) {
      return <ErrorState title={error} />;
    }
    if (!data) {
      return <LoadingState title="Loading pages…" />;
    }

    if (!Object.keys(data).length) {
      return (
        <EmptyState
          title="No pages"
          copy="You don't have any pages created yet."
        />
      );
    }

    return (
      <Table style={{marginTop: 12}}>
        <thead>
          <tr>
            <TableHeaderCell $wrapAt={150}>Title</TableHeaderCell>
            <TableHeaderCell $wrapAt={100}>Slug</TableHeaderCell>
            <TableHeaderCell $wrapAt={100}>Type</TableHeaderCell>
            <TableHeaderCell />
            <TableHeaderCell />
          </tr>
        </thead>
        <tbody>
          {Object.keys(data)
            .sort((a, b) => a.localeCompare(b))
            .map((pageKey, i) => {
              const page = data[pageKey];
              return (
                <PageTableRow
                  key={page.slug}
                  onDelete={this.handleDelete}
                  onEdit={this.handleEdit}
                  onNavigate={this.props.onNavigate}
                  page={page}
                />
              );
            })}
        </tbody>
      </Table>
    );
  }

  handleCloseEditing = () => {
    this.setState({editing: null});
  };

  handlePageSave = (page: Page) => {
    const data = this.state.data;
    if (!data) {
      return;
    }

    const newData = {...data, [page.slug]: page};
    this.setState({data: null, error: null, editing: null});

    const body = new FormData();
    body.append('title', page.title);
    const pageBody = page.body;
    switch (page.page_type) {
      case 'markdown':
        if (typeof pageBody !== 'string') {
          throw new Error('unreachable');
        }
        body.append('body', pageBody);
        break;
      case 'hosts':
      case 'contact':
        body.append('body', JSON.stringify(pageBody));
        break;
    }

    const {slug} = this.props;
    xhr({
      body,
      method: 'POST',
      url: url`/sites/site_builder/editor/pages/${slug}/${page.slug}`,
    }).then(
      () => {
        this.setState({data: newData});
        clearCache();
        this.props.onRefresh();
      },
      () => {
        this.setState({error: 'Could not contact Pinecast'});
      },
    );
  };

  renderEditing() {
    const {data, editing} = this.state;
    if (!data) {
      return null;
    }
    if (!editing) {
      throw new Error('unreachable');
    }

    const page = data[editing];
    if (!page) {
      throw new Error('unreachable');
    }

    let innerType;
    switch (page.page_type) {
      case 'markdown':
        innerType = MarkdownEditor;
        break;
      case 'hosts':
        innerType = HostsFields;
        break;
      case 'contact':
        innerType = ContactFields;
        break;
      default:
        throw new Error('unreachable');
    }

    return (
      <ModalLayer canEscape={false} onClose={this.handleCloseEditing} open>
        <PageEditorModal
          editorComponent={innerType}
          onClose={this.handleCloseEditing}
          onSave={this.handlePageSave}
          page={page}
        />
      </ModalLayer>
    );
  }

  handleCloseNew = () => this.setState({new_: null});
  handlePageSaveNew = (page: Page) => {
    const data = this.state.data;
    if (!data) {
      return;
    }

    const newData = {...data, [page.slug]: page};
    this.setState({data: null, error: null, new_: null});

    const body = new FormData();
    body.append('title', page.title);
    body.append('slug', page.slug);
    body.append(
      'body',
      typeof page.body === 'object' ? JSON.stringify(page.body) : page.body,
    );
    body.append('page_type', page.page_type);
    const {slug} = this.props;
    xhr({
      body,
      method: 'POST',
      url: url`/sites/site_builder/editor/pages/${slug}`,
    }).then(
      () => {
        this.setState({data: newData});
        clearCache();
        this.props.onRefresh();
      },
      () => {
        this.setState({error: 'Could not contact Pinecast'});
      },
    );
  };

  renderNew() {
    const {new_} = this.state;

    let innerType;
    let initial;
    switch (new_) {
      case 'markdown':
        innerType = MarkdownEditor;
        initial = '';
        break;
      case 'hosts':
        innerType = HostsFields;
        initial = [{name: ''}];
        break;
      case 'contact':
        innerType = ContactFields;
        initial = {};
        break;
      default:
        throw new Error('unreachable');
    }
    return (
      <ModalLayer canEscape={true} onClose={this.handleCloseNew} open>
        <PageEditorModal
          editorComponent={innerType}
          onClose={this.handleCloseNew}
          onSave={this.handlePageSaveNew}
          page={{
            title: '',
            slug: '',
            page_type: new_,
            body: initial,
          }}
          showSlug
        />
      </ModalLayer>
    );
  }

  render() {
    return (
      <React.Fragment>
        <PanelWrapper>
          <PanelDescription>
            Add pages to your site to add content alongside your episodes.
          </PanelDescription>

          {this.renderToolbar()}

          {this.renderInner()}
        </PanelWrapper>
        {this.state.editing && this.renderEditing()}
        {this.state.new_ && this.renderNew()}
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ReducerType) => ({
    path: state.preview.path,
    slug: state.slug,
  }),
  {onNavigate: changePath, onRefresh: refresh},
)(PagesPanel);
