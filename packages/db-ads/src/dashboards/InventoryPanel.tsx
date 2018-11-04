import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import {compose} from '@pinecast/common/helpers';
import EmptyState from '@pinecast/common/EmptyState';
import ErrorState from '@pinecast/common/ErrorState';
import Group from '@pinecast/common/Group';
import LoadingState from '@pinecast/common/LoadingState';
import {MeatballIconMenu} from '@pinecast/common/ContextMenu';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import * as Table from '@pinecast/common/Table';
import Tag from '@pinecast/common/Tag';
import xhr from '@pinecast/xhr';

import {listAds, ListAdsState} from '../dataProviders/inventory';
import NewAdForm from './inventory/NewAdForm';

class InventoryPanel extends React.Component {
  props: {
    inventory: ListAdsState;
  };
  state: {
    calloutError: React.ReactNode | null;
    pending: boolean;
  };

  constructor(props: InventoryPanel['props']) {
    super(props);
    this.state = {
      calloutError: null,
      pending: false,
    };
  }

  renderInlineError() {
    if (this.state.calloutError) {
      return (
        <Callout style={{marginTop: 0}} type="negative">
          {this.state.calloutError}
        </Callout>
      );
    }
    return null;
  }

  handleReloadInventory = () => {
    this.props.inventory.reload();
  };
  handleDeleteAd = async (uuid: string) => {
    this.setState({calloutError: null, pending: true});
    try {
      const body = new FormData();
      body.append('uuid', uuid);
      await xhr({
        method: 'POST',
        url: '/advertisements/inventory/discontinue',
        body,
      });
      this.setState({pending: false});
      return this.props.inventory.reload();
    } catch (e) {
      this.setState({
        calloutError: 'There was an error discontinuing the ad.',
        pending: false,
      });
      return;
    }
  };
  handleReenableAd = async (uuid: string) => {
    this.setState({calloutError: null, pending: true});
    try {
      const body = new FormData();
      body.append('uuid', uuid);
      await xhr({
        method: 'POST',
        url: '/advertisements/inventory/reenable',
        body,
      });
      this.setState({pending: false});
      return this.props.inventory.reload();
    } catch (e) {
      this.setState({
        calloutError: 'There was an error discontinuing the ad.',
        pending: false,
      });
      return;
    }
  };

  renderModal = ({handleClose}: {handleClose: () => void}) => {
    return (
      <NewAdForm
        onCancel={handleClose}
        onNewAd={() => {
          handleClose();
          this.props.inventory.reload();
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
                  New advertisement
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
                          <Group spacing={8}>
                            <b style={{opacity: ad.discontinued ? 0.5 : 1}}>
                              {ad.name}
                            </b>
                            {ad.discontinued && (
                              <Tag color="gray">Discontinued</Tag>
                            )}
                          </Group>
                        </Table.TableBodyCell>
                        <Table.TableBodyCell style={{width: 32}}>
                          <MeatballIconMenu
                            onSelect={slug => {
                              switch (slug) {
                                case 'delete':
                                  this.handleDeleteAd(ad.uuid);
                                  break;
                                case 'reenable':
                                  this.handleReenableAd(ad.uuid);
                                  break;
                              }
                            }}
                            options={[
                              !ad.discontinued
                                ? {name: 'Discontinue', slug: 'delete'}
                                : {name: 'Re-enable', slug: 'reenable'},
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
