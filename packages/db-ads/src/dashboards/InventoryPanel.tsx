import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import {compose} from '@pinecast/common/helpers';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import EmptyState from '@pinecast/common/EmptyState';
import ErrorState from '@pinecast/common/ErrorState';
import Group from '@pinecast/common/Group';
import LoadingState from '@pinecast/common/LoadingState';
import {MeatballIconMenu} from '@pinecast/common/ContextMenu';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import styled from '@pinecast/styles';
import Tag from '@pinecast/common/Tag';
import TooltipContainer from '@pinecast/common/TooltipContainer';
import * as Text from '@pinecast/common/Text';
import Well from '@pinecast/common/Well';
import xhr from '@pinecast/xhr';

import {listAds, ListAdsState} from '../dataProviders/inventory';
import NewAdForm from './inventory/NewAdForm';

const messages = defineMessages({
  placementCount: {
    id: 'db-ads.InventoryPanel.ad.placement_count',
    description: 'Describes how many places and ad has been placed',
    defaultMessage:
      '{count} {count, plural, one {active placement} other {active placements}}',
  },
});

const MeatballWrapper = styled('div', {
  alignItems: 'flex-start',
  display: 'flex',
  justifyContent: 'space-between',
});

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
                  // TODO: Disable this when there are no tags
                  $isBlock
                  onClick={handleOpen}
                  style={{marginBottom: 24}}
                >
                  New advertisement
                </Button>

                <Well>
                  {inventory.data.map(ad => (
                    <Card
                      key={ad.uuid}
                      style={{opacity: ad.discontinued ? 0.5 : 1}}
                      whiteBack
                    >
                      <MeatballWrapper>
                        <Text.DashboardTitle>
                          <Group spacing={8}>
                            <span style={{opacity: ad.discontinued ? 0.5 : 1}}>
                              {ad.name}
                            </span>
                            {ad.discontinued && (
                              <Tag color="gray">Discontinued</Tag>
                            )}
                          </Group>
                        </Text.DashboardTitle>
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
                          style={{height: 16}}
                        />
                      </MeatballWrapper>
                      <Text.P>
                        <FormattedMessage
                          {...messages.placementCount}
                          values={{count: ad.placements}}
                        />
                        {Boolean(ad.offer_code) && (
                          <React.Fragment>
                            {' · Offer code '}
                            <Tag color="green">{ad.offer_code}</Tag>
                          </React.Fragment>
                        )}
                      </Text.P>
                      <Group spacing={8}>
                        {ad.tags.map(
                          tag =>
                            tag.description ? (
                              <TooltipContainer
                                key={tag.uuid}
                                tooltipContent={tag.description}
                              >
                                <Tag color="blue">{tag.name}</Tag>
                              </TooltipContainer>
                            ) : (
                              <Tag color="blue">{tag.name}</Tag>
                            ),
                        )}
                      </Group>
                    </Card>
                  ))}
                </Well>
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

export default compose(listAds<InventoryPanel['props']>('inventory'))(
  InventoryPanel,
);
