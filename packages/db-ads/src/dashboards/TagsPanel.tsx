import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import {compose} from '@pinecast/common/helpers';
import EmptyState from '@pinecast/common/EmptyState';
import ErrorState from '@pinecast/common/ErrorState';
import LoadingState from '@pinecast/common/LoadingState';
import {MeatballIconMenu} from '@pinecast/common/ContextMenu';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import * as Table from '@pinecast/common/Table';
import xhr from '@pinecast/xhr';

import {listTags, ListTagsState} from '../dataProviders/tags';
import NewTagForm from './tags/NewTagForm';

class TagsPanel extends React.Component {
  props: {
    tags: ListTagsState;
  };
  state: {
    createError: React.ReactNode | null;
    deleteError: React.ReactNode | null;
    pending: boolean;
  };

  constructor(props: TagsPanel['props']) {
    super(props);
    this.state = {
      createError: null,
      deleteError: null,
      pending: false,
    };
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
    this.props.tags.reload();
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
      this.setState({pending: false});
      return this.props.tags.reload();
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
      await xhr({
        method: 'POST',
        url: '/advertisements/tags/create',
        body,
      });
      this.setState({pending: false});
      return this.props.tags.reload();
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
    const {pending} = this.state;
    const {tags} = this.props;
    if (pending || tags.isLoading || tags.isInitial) {
      return <LoadingState title="Loading tags…" />;
    }
    if (tags.isErrored) {
      return (
        <ErrorState
          actionLabel="Retry"
          title="We could not load your tags."
          onAction={this.handleReloadTags}
        />
      );
    }
    return (
      <ModalOpener renderModal={this.renderModal}>
        {({handleOpen}) => (
          <React.Fragment>
            {this.renderInlineError()}
            {tags.data.length > 0 ? (
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
                    <tr>
                      <Table.TableHeaderCell>Name</Table.TableHeaderCell>
                      <Table.TableHeaderCell>Description</Table.TableHeaderCell>
                      <Table.TableHeaderCell />
                    </tr>
                  </thead>
                  <tbody>
                    {tags.data.map(tag => (
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

export default compose(listTags<TagsPanel['props'], 'tags'>('tags'))(TagsPanel);
