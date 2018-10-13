import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import {compose} from '@pinecast/common/helpers';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import EmptyState from '@pinecast/common/EmptyState';
import ErrorState from '@pinecast/common/ErrorState';
import LoadingState from '@pinecast/common/LoadingState';
import {MeatballIconMenu} from '@pinecast/common/ContextMenu';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import * as Table from '@pinecast/common/Table';
import xhr from '@pinecast/xhr';

import {listTags, ListTagsState} from '../dataProviders/tags';
import NewTagForm from './tags/NewTagForm';

const messages = defineMessages({
  errorDeletingTag: {
    id: 'db-ads.TagsPanel.error.deletingTag',
    description: 'Error shown when a tag could not be deleted',
    defaultMessage: 'There was an error deleting the tag.',
  },
  errorCreatingTag: {
    id: 'db-ads.TagsPanel.error.creatingTag',
    description: 'Error shown when a tag could not be created',
    defaultMessage: 'There was an error creating the tag.',
  },
  loading: {
    id: 'db-ads.TagsPanel.loading',
    description: 'Loading message for the list of tags for advertisements',
    defaultMessage: 'Loading tags…',
  },
  retry: {
    id: 'db-ads.TagsPanel.button.retry',
    description: 'Button shown on an error to retry the operation',
    defaultMessage: 'Retry',
  },
  errorLoadingTags: {
    id: 'db-ads.TagsPanel.error.loading',
    description: 'Error when loading tags',
    defaultMessage: 'We could not load your tags.',
  },

  colName: {
    id: 'db-ads.TagsPanel.table.column.name',
    description: 'Column header for tag name',
    defaultMessage: 'Name',
  },
  colDesc: {
    id: 'db-ads.TagsPanel.table.column.description',
    description: 'Column header for tag description',
    defaultMessage: 'Description',
  },
  optionDelete: {
    id: 'db-ads.TagsPanel.option.delete',
    description: 'Option to delete a tag',
    defaultMessage: 'Delete',
  },

  emptyTitle: {
    id: 'db-ads.TagsPanel.empty.title',
    description: 'Title of the empty state for tags',
    defaultMessage: 'You do not have any tags yet.',
  },
  emptyCopy: {
    id: 'db-ads.TagsPanel.empty.copy',
    description: 'Copy for empty state for tags',
    defaultMessage:
      'Tags let you match advertisements with appropriate ad spots.',
  },
  emptyCta: {
    id: 'db-ads.TagsPanel.empty.cta',
    description: 'Button to create a new tag in the empty state',
    defaultMessage: 'Create a tag',
  },

  cta: {
    id: 'db-ads.TagsPanel.cta',
    description: 'Button to create a new tag',
    defaultMessage: 'New tag',
  },
});

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
        deleteError: <FormattedMessage {...messages.errorDeletingTag} />,
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
        createError: <FormattedMessage {...messages.errorCreatingTag} />,
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
      return (
        <LoadingState title={<FormattedMessage {...messages.loading} />} />
      );
    }
    if (tags.isErrored) {
      return (
        <ErrorState
          actionLabel={<FormattedMessage {...messages.retry} />}
          title={<FormattedMessage {...messages.errorLoadingTags} />}
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
                  <FormattedMessage {...messages.cta} />
                </Button>
                <Table.Table style={{marginBottom: 0}}>
                  <thead>
                    <tr>
                      <Table.TableHeaderCell>
                        <FormattedMessage {...messages.colName} />
                      </Table.TableHeaderCell>
                      <Table.TableHeaderCell>
                        <FormattedMessage {...messages.colDesc} />
                      </Table.TableHeaderCell>
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
                            options={[
                              {
                                name: (
                                  <FormattedMessage
                                    {...messages.optionDelete}
                                  />
                                ),
                                slug: 'delete',
                              },
                            ]}
                          />
                        </Table.TableBodyCell>
                      </tr>
                    ))}
                  </tbody>
                </Table.Table>
              </React.Fragment>
            ) : (
              <EmptyState
                actionLabel={<FormattedMessage {...messages.emptyCta} />}
                copy={<FormattedMessage {...messages.emptyCopy} />}
                title={<FormattedMessage {...messages.emptyTitle} />}
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
