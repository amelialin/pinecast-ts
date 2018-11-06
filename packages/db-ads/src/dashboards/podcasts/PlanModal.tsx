import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import {compose} from '@pinecast/common/helpers';
import Dialog from '@pinecast/common/Dialog';
import ErrorState from '@pinecast/common/ErrorState';
import LoadingState from '@pinecast/common/LoadingState';
import * as Table from '@pinecast/common/Table';
import * as Text from '@pinecast/common/Text';

import {
  getPodcastPlan,
  GetPodcastPlanState,
  PlanResult,
} from '../../dataProviders/podcasts';

class PlanModal extends React.Component {
  props: {
    onClose: () => void;
    plan: GetPodcastPlanState;
    slug: string;
  };

  renderRows(plan: PlanResult) {
    return Object.entries(plan).map(([epId, epr]) => (
      <React.Fragment key={epId}>
        {epr.paired.map(pair => (
          <tr key={pair.break.uuid}>
            <Table.TableBodyCell>
              {pair.break.episode.title}
            </Table.TableBodyCell>
            <Table.TableBodyCell>{pair.break.timecode}</Table.TableBodyCell>
            <Table.TableBodyCell>{pair.ad.name}</Table.TableBodyCell>
          </tr>
        ))}
      </React.Fragment>
    ));
  }

  render() {
    const {plan} = this.props;
    if (plan.isLoading) {
      return <LoadingState title="Generating plan…" />;
    }
    if (plan.isErrored || !plan.isCompleted) {
      return (
        <ErrorState
          actionLabel="Retry"
          title="Could not create placement plan."
          onAction={plan.reload}
        />
      );
    }
    return (
      <Dialog
        actions={
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button $isPrimary>Process ads</Button>
          </ButtonGroup>
        }
        title="Ad placement plan"
      >
        <Text.DashboardTitle>Placed ads</Text.DashboardTitle>
        <Table.Table>
          <thead>
            <tr>
              <Table.TableHeaderCell>Episode</Table.TableHeaderCell>
              <Table.TableHeaderCell>Time code</Table.TableHeaderCell>
              <Table.TableHeaderCell>Ad</Table.TableHeaderCell>
            </tr>
          </thead>
          <tbody>{this.renderRows(plan.data)}</tbody>
        </Table.Table>
      </Dialog>
    );
  }
}

export default compose(getPodcastPlan<PlanModal['props'], 'plan'>('plan'))(
  PlanModal,
);
