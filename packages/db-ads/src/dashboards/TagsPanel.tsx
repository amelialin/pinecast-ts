import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import EmptyState from '@pinecast/common/EmptyState';
import ErrorState from '@pinecast/common/ErrorState';
import LoadingState from '@pinecast/common/LoadingState';
import {MeatballIconMenu} from '@pinecast/common/ContextMenu';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import * as Table from '@pinecast/common/Table';
import xhr from '@pinecast/xhr';

import * as models from '../models';
import NewTagForm from './tags/NewTagForm';

export default class TagsPanel extends React.Component {
  props: {};
  state: {
    createError: React.ReactNode | null;
    deleteError: React.ReactNode | null;
    loadingError: React.ReactNode | null;
    pending: boolean;
    tags: Array<models.Tag> | null;
  };

  constructor(props: TagsPanel['props']) {
    super(props);
    this.load();
    this.state = {
      createError: null,
      deleteError: null,
      loadingError: null,
      pending: true,
      tags: null,
    };
  }

  async load() {
    try {
      const resp = await xhr({
        method: 'GET',
        url: '/advertisements/tags/',
      });
      const tags = JSON.parse(resp);
      this.setState({loadingError: null, pending: false, tags});
    } catch (e) {
      this.setState({
        loadingError: 'We could not load your tags.',
        pending: false,
      });
      return;
    }
  }

  renderInlineError() {
    if (this.state.createError) {
      return (
        <Callout style={{marginTop: 0}} type="negative">
          {this.state.createError}
        </Callout>
      );
    }
    if (this.state.deleteError) {
      return (
        <Callout style={{marginTop: 0}} type="negative">
          {this.state.deleteError}
        </Callout>
      );
    }
    return null;
  }

  handleReloadTags = () => {
    this.setState({loadingError: false, pending: true});
    this.load();
  };
  handleDeleteTag = async (uuid: string) => {
    this.setState({deleteError: null, pending: true});
    try {
      const body = new FormData();
      body.append('uuid', uuid);
      await xhr({
        method: 'POST',
        url: '/advertisements/tags/delete',
        body,
      });
      return this.load();
    } catch (e) {
      this.setState({
        deleteError: 'There was an error deleting the tag.',
        pending: false,
      });
      return;
    }
  };
  handleNewTag = async (name: string, description: string) => {
    this.setState({createError: null, pending: true});
    try {
      const body = new FormData();
      body.append('name', name);
      body.append('description', description);
      const resp = await xhr({
        method: 'POST',
        url: '/advertisements/tags/create',
        body,
      });
      const tag = JSON.parse(resp);
      this.setState({pending: false, tags: [tag, ...this.state.tags!]});
    } catch (e) {
      this.setState({
        createError: 'There was an error creating the tag.',
        pending: false,
      });
      return;
    }
  };

  renderModal = ({handleClose}: {handleClose: () => void}) => {
    return (
      <NewTagForm
        onCancel={handleClose}
        onNewTag={(name, description) => {
          handleClose();
          this.handleNewTag(name, description);
        }}
      />
    );
  };

  render() {
    const {loadingError, pending, tags} = this.state;
    if (pending) {
      return <LoadingState title="Loading tags…" />;
    }
    if (loadingError) {
      return (
        <ErrorState
          actionLabel="Retry"
          title={loadingError}
          onAction={this.handleReloadTags}
        />
      );
    }
    return (
      <ModalOpener renderModal={this.renderModal}>
        {({handleOpen}) => (
          <React.Fragment>
            {this.renderInlineError()}
            {tags!.length > 0 ? (
              <React.Fragment>
                <Button
                  $isBlock
                  onClick={handleOpen}
                  style={{marginBottom: 24}}
                >
                  New tag
                </Button>
                <Table.Table style={{marginBottom: 0}}>
                  <thead>
                    <Table.TableHeaderCell>Name</Table.TableHeaderCell>
                    <Table.TableHeaderCell>Description</Table.TableHeaderCell>
                    <Table.TableHeaderCell />
                  </thead>
                  <tbody>
                    {this.state.tags!.map(tag => (
                      <tr key={tag.uuid}>
                        <Table.TableBodyCell>
                          <b>{tag.name}</b>
                        </Table.TableBodyCell>
                        <Table.TableBodyCell $wrapAt={200}>
                          {tag.description}
                        </Table.TableBodyCell>
                        <Table.TableBodyCell style={{width: 32}}>
                          <MeatballIconMenu
                            onSelect={slug => {
                              this.handleDeleteTag(tag.uuid);
                            }}
                            options={[{name: 'Delete', slug: 'delete'}]}
                          />
                        </Table.TableBodyCell>
                      </tr>
                    ))}
                  </tbody>
                </Table.Table>
              </React.Fragment>
            ) : (
              <EmptyState
                actionLabel="Create a tag"
                copy="Tags let you match advertisements with appropriate ad spots."
                title="You do not have any tags yet."
                onAction={handleOpen}
              />
            )}
          </React.Fragment>
        )}
      </ModalOpener>
    );
  }
}
