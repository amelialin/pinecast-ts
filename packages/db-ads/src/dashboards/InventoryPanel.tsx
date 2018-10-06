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

import {listAds, ListAdsState} from '../dataProviders/inventory';
import * as models from '../models';
import NewAdForm from './inventory/NewAdForm';

class InventoryPanel extends React.Component {
  props: {
    inventory: ListAdsState;
  };
  state: {
    createError: React.ReactNode | null;
    deleteError: React.ReactNode | null;
    pending: boolean;
  };

  constructor(props: InventoryPanel['props']) {
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

  handleReloadInventory = () => {
    this.props.inventory.reload();
  };
  handleDeleteAd = async (uuid: string) => {
    this.setState({deleteError: null, pending: true});
    try {
      const body = new FormData();
      body.append('uuid', uuid);
      await xhr({
        method: 'POST',
        url: '/advertisements/inventory/delete',
        body,
      });
      this.setState({pending: false});
      return this.props.inventory.reload();
    } catch (e) {
      this.setState({
        deleteError: 'There was an error deleting the tag.',
        pending: false,
      });
      return;
    }
  };
  handleNewAd = async (payload: models.MutableAdvertisement) => {
    this.setState({createError: null, pending: true});
    try {
      const body = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        body.append(key, value as string);
      });
      await xhr({
        method: 'POST',
        url: '/advertisements/inventory/create',
        body,
      });
      this.setState({pending: false});
      return this.props.inventory.reload();
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
      <NewAdForm
        onCancel={handleClose}
        onNewTag={payload => {
          handleClose();
          this.handleNewAd(payload);
        }}
      />
    );
  };

  render() {
    const {pending} = this.state;
    const {inventory} = this.props;
    if (pending || inventory.isLoading || inventory.isInitial) {
      return <LoadingState title="Loading inventory…" />;
    }
    if (inventory.isErrored) {
      return (
        <ErrorState
          actionLabel="Retry"
          title="We could not load your inventory."
          onAction={this.handleReloadInventory}
        />
      );
    }
    return (
      <ModalOpener renderModal={this.renderModal}>
        {({handleOpen}) => (
          <React.Fragment>
            {this.renderInlineError()}
            {inventory.data.length > 0 ? (
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
                      <Table.TableHeaderCell />
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.data.map(ad => (
                      <tr key={ad.uuid}>
                        <Table.TableBodyCell>
                          <b>{ad.name}</b>
                        </Table.TableBodyCell>
                        <Table.TableBodyCell style={{width: 32}}>
                          <MeatballIconMenu
                            onSelect={slug => {
                              this.handleDeleteAd(ad.uuid);
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
                actionLabel="Upload an advertisement"
                copy="Your advertisements are your inventory. Upload your first advertisement to start placing ads."
                title="You do not have any inventory yet."
                onAction={handleOpen}
              />
            )}
          </React.Fragment>
        )}
      </ModalOpener>
    );
  }
}

export default compose(
  listAds<InventoryPanel['props'], 'inventory'>('inventory'),
)(InventoryPanel);
