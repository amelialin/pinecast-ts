import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import {url} from '@pinecast/common/helpers';
import Dialog from '@pinecast/common/Dialog';
import ErrorState from '@pinecast/common/ErrorState';
import LoadingState from '@pinecast/common/LoadingState';
import Group from '@pinecast/common/Group';
import * as Table from '@pinecast/common/Table';
import Tag from '@pinecast/common/Tag';
import * as Text from '@pinecast/common/Text';
import xhr from '@pinecast/xhr';

import {
  EpisodePlanResult,
  // getPodcastPlan,
  // GetPodcastPlanState,
  PlanResult,
} from '../../dataProviders/podcasts';

export default class PlanModal extends React.Component {
  props: {
    onClose: () => void;
    // plan: GetPodcastPlanState;
    slug: string;
  };

  state:
    | {error: JSX.Element | string; pending: false; plan: null}
    | {error: null; pending: true; plan: null}
    | {error: null; pending: false; plan: PlanResult} = {
    error: null,
    pending: true,
    plan: null,
  };

  componentDidMount() {
    this.load();
  }

  load = () => {
    this.setState({error: null, pending: true, plan: null});
    xhr({
      url: url`/advertisements/podcasts/plan/${this.props.slug}`,
      method: 'GET',
    })
      .then(result => JSON.parse(result))
      .then(plan => this.setState({pending: false, plan}))
      .catch(() =>
        this.setState({
          error: 'Could not create placement plan.',
          pending: false,
        }),
      );
  };

  renderRows(plan: PlanResult) {
    return Object.entries(plan).map(([epId, epr]) => (
      <React.Fragment key={epId}>
        {(epr as EpisodePlanResult).paired.map(pair => (
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

  renderUnpairedRows(plan: PlanResult) {
    return Object.entries(plan).map(([epId, epr]) => (
      <React.Fragment key={epId}>
        {(epr as EpisodePlanResult).unpaired.map(b => (
          <tr key={b.uuid}>
            <Table.TableBodyCell>{b.episode.title}</Table.TableBodyCell>
            <Table.TableBodyCell>{b.timecode}</Table.TableBodyCell>
            <Table.TableBodyCell>
              <Group spacing={8} allowWrap>
                {b.tags.map(tag => (
                  <Tag color="gray" key={tag.uuid} size="small">
                    {tag.name}
                  </Tag>
                ))}
              </Group>
            </Table.TableBodyCell>
          </tr>
        ))}
      </React.Fragment>
    ));
  }

  renderInner() {
    if (this.state.pending) {
      return <LoadingState title="Generating plan…" />;
    }
    if (this.state.error != null) {
      return (
        <ErrorState
          actionLabel="Retry"
          title={this.state.error}
          onAction={this.load}
        />
      );
    }
    const plan = this.state.plan!;
    return (
      <React.Fragment>
        <Text.DashboardTitle>Placed ads</Text.DashboardTitle>
        <Table.Table>
          <thead>
            <tr>
              <Table.TableHeaderCell>Episode</Table.TableHeaderCell>
              <Table.TableHeaderCell>Time code</Table.TableHeaderCell>
              <Table.TableHeaderCell>Ad</Table.TableHeaderCell>
            </tr>
          </thead>
          <tbody>{this.renderRows(plan)}</tbody>
        </Table.Table>
        {Object.values(plan).some(epPlan => epPlan.unpaired.length > 0) && (
          <React.Fragment>
            <Text.DashboardTitle>Ad breaks without ads</Text.DashboardTitle>
            <Text.P>
              We were unable to match these ad breaks with advertisements.
            </Text.P>
            <Table.Table>
              <thead>
                <tr>
                  <Table.TableHeaderCell>Episode</Table.TableHeaderCell>
                  <Table.TableHeaderCell>Time code</Table.TableHeaderCell>
                  <Table.TableHeaderCell>Tags</Table.TableHeaderCell>
                </tr>
              </thead>
              <tbody>{this.renderUnpairedRows(plan)}</tbody>
            </Table.Table>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  canProcess() {
    if (this.state.pending || this.state.error) {
      return false;
    }
    return (
      Object.keys(this.state.plan!).length > 0 &&
      Object.values(this.state.plan!).some(
        (epPlan: EpisodePlanResult) => epPlan.paired.length > 0,
      )
    );
  }

  render() {
    return (
      <Dialog
        actions={
          <ButtonGroup>
            <Button onClick={this.props.onClose}>Cancel</Button>
            {this.canProcess() && <Button $isPrimary>Process ads</Button>}
          </ButtonGroup>
        }
        title="Ad placement plan"
      >
        {this.renderInner()}
      </Dialog>
    );
  }
}

// export default compose(getPodcastPlan<PlanModal['props'], 'plan'>('plan'))(
//   PlanModal,
// );
