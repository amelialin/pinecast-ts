import * as React from 'react';

import {compose, url} from '@pinecast/common/helpers';
import EmptyState from '@pinecast/common/EmptyState';
import ErrorState from '@pinecast/common/ErrorState';
import Link from '@pinecast/common/Link';
import LoadingState from '@pinecast/common/LoadingState';
import {MeatballIconMenu} from '@pinecast/common/ContextMenu';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import * as Table from '@pinecast/common/Table';
import Tag from '@pinecast/common/Tag';

import {
  listEligiblePodcasts,
  ListEligiblePodcastsState,
} from '../dataProviders/podcasts';
import PlanModal from './podcasts/PlanModal';

class PodcastsPanel extends React.Component {
  props: {
    podcasts: ListEligiblePodcastsState;
  };

  render() {
    const {podcasts} = this.props;
    if (podcasts.isLoading || podcasts.isInitial) {
      return <LoadingState title="Loading podcasts…" />;
    }
    if (podcasts.isErrored) {
      return (
        <ErrorState
          actionLabel="Retry"
          title="We could not load your podcasts."
          onAction={podcasts.reload}
        />
      );
    }
    return (
      <React.Fragment>
        {podcasts.data.length > 0 ? (
          <React.Fragment>
            <Table.Table style={{marginBottom: 0}}>
              <thead>
                <tr>
                  <Table.TableHeaderCell>Podcast</Table.TableHeaderCell>
                  <Table.TableHeaderCell>Status</Table.TableHeaderCell>
                  <Table.TableHeaderCell />
                </tr>
              </thead>
              <tbody>
                {podcasts.data
                  .sort(
                    (a, b) =>
                      Number(b.requires_reprocessing) -
                        Number(a.requires_reprocessing) ||
                      a.name.localeCompare(b.name),
                  )
                  .map(pod => (
                    <tr key={pod.slug}>
                      <Table.TableBodyCell>
                        <Link href={url`/dashboard/podcast/${pod.slug}`}>
                          <b>{pod.name}</b>
                        </Link>
                      </Table.TableBodyCell>
                      <Table.TableBodyCell>
                        {!pod.requires_reprocessing ? (
                          <Tag color="gray">Processed</Tag>
                        ) : (
                          <Tag color="red">Pending</Tag>
                        )}
                      </Table.TableBodyCell>
                      <Table.TableBodyCell style={{width: 32}}>
                        {pod.requires_reprocessing && (
                          <ModalOpener
                            renderModal={({handleClose}) => (
                              <PlanModal
                                onClose={handleClose}
                                slug={pod.slug}
                              />
                            )}
                          >
                            {({handleOpen}) => (
                              <MeatballIconMenu
                                onSelect={slug => {
                                  switch (slug) {
                                    case 'process':
                                      handleOpen();
                                      break;
                                  }
                                }}
                                options={[{name: 'Process', slug: 'process'}]}
                              />
                            )}
                          </ModalOpener>
                        )}
                      </Table.TableBodyCell>
                    </tr>
                  ))}
              </tbody>
            </Table.Table>
          </React.Fragment>
        ) : (
          <EmptyState
            copy="Create a podcast first in order to inject advertisements."
            title="You do not have any podcasts yet."
          />
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  listEligiblePodcasts<PodcastsPanel['props'], 'podcasts'>('podcasts'),
)(PodcastsPanel);
