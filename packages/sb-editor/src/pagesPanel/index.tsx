import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/styles';

import Button, {ButtonGroup} from '../common/Button';
import {changePath, refresh} from '../actions/preview';
import ContactFields from './ContactFields';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import HostsFields from './HostsFields';
import LoadingState from '../common/LoadingState';
import PageEditorModal from './PageEditorModal';
import MarkdownEditor from './MarkdownEditor';
import ModalLayer from '../common/ModalLayer';
import {Page} from './types';
import PageTableRow from './PageTableRow';
import {PageHeading, PanelDescription, PanelWrapper} from '../panelComponents';
import {ReducerType} from '../reducer';
import request, {clearCache} from '../data/requests';
import {Table, TableHeaderCell} from '../common/Table';
import xhr from '../data/xhr';

const HeaderWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

class PagesPanel extends React.PureComponent {
  props: {
    csrf: string;
    onNavigate: (path: string) => void;
    onRefresh: () => void;
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

  componentWillMount() {
    const {slug} = this.props;
    request(`/sites/site_builder/editor/pages/${encodeURIComponent(slug)}`)
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          this.setState({data: parsed});
        },
        () => {
          this.setState({error: 'Failed to load pages from Pinecast'});
        },
      );
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

    const {csrf, slug} = this.props;
    xhr({
      headers: {'X-CSRFToken': csrf},
      method: 'POST',
      url: `/sites/site_builder/editor/pages/${encodeURIComponent(
        slug,
      )}/${encodeURIComponent(pageSlug)}/delete`,
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
      <Table>
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

    const {csrf, slug} = this.props;
    xhr({
      body,
      headers: {'X-CSRFToken': csrf},
      method: 'POST',
      url: `/sites/site_builder/editor/pages/${encodeURIComponent(
        slug,
      )}/${encodeURIComponent(page.slug)}`,
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
    const {csrf, slug} = this.props;
    xhr({
      body,
      headers: {'X-CSRFToken': csrf},
      method: 'POST',
      url: `/sites/site_builder/editor/pages/${encodeURIComponent(slug)}`,
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
        <HeaderWrapper>
          <PageHeading>Pages</PageHeading>
        </HeaderWrapper>
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
    csrf: state.csrf,
    path: state.preview.path,
    slug: state.slug,
  }),
  {onNavigate: changePath, onRefresh: refresh},
)(PagesPanel);