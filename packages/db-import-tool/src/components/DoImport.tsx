import * as React from 'react';

import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import {DashboardTitle, P} from '@pinecast/common/Text';
import Hr from '@pinecast/common/HorizontalRule';
import styled from '@pinecast/styles';
import TooltipContainer from '@pinecast/common/TooltipContainer';
import xhr from '@pinecast/xhr';

import {Feed} from '../types';
import {cardStyle} from './cardStyle';

async function sleep(timeout: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

type pendingItem = {id: number; status: 'pending'};
type failedItem = {id: number; status: 'failed'; failure_message: string};
type completeItem = {id: number; status: 'complete'};
type Item = pendingItem | failedItem | completeItem;

const StatusWrap = styled('div', {
  fontWeight: 500,
  marginBottom: 8,
});
const BulkProgressWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: -4,
});
const ItemStatus = styled('div', ({$status}: {$status: Item['status']}) => ({
  backgroundColor:
    $status === 'pending'
      ? '#d8e9f1'
      : $status === 'complete' ? '#51d197' : '#ef6b6b',
  borderRadius: 3,
  display: 'block',
  flex: '0 0 24px',
  height: 24,
  margin: '0 4px 4px 0',
  transition: 'background-color 0.5s',
  width: 24,
}));

export default class DoImport extends React.Component {
  props: {feed: Feed; onComplete: () => void};
  state: {
    error: string | null;
    ids: Array<Item> | null;
  } = {error: null, ids: null};

  componentDidMount() {
    this.startImport();
  }

  async startImport() {
    try {
      const parsed: {error?: string; ids: Array<string>} = JSON.parse(
        await xhr({
          body: JSON.stringify(this.props.feed),
          method: 'POST',
          url: '/dashboard/services/import/start',
        }),
      );
      if (parsed.error) {
        this.setState({error: parsed.error});
        return;
      }

      await new Promise(resolve =>
        this.setState(
          {
            ids: parsed.ids.map(id => ({id, status: 'pending'})),
          },
          resolve,
        ),
      );
    } catch {
      this.setState({error: 'Could not contact Pinecast'});
      return;
    }

    if (!this.state.ids) {
      throw new Error('unreachable');
    }

    let failures = 0;

    while (!this.state.ids.every(({status}) => status !== 'pending')) {
      await sleep(4000);

      try {
        const resp = JSON.parse(
          await xhr(
            `/dashboard/services/import/progress/${encodeURIComponent(
              this.props.feed.slug || '',
            )}?ids=${encodeURIComponent(
              this.state.ids.map(x => x.id).join(','),
            )}`,
          ),
        );
        await new Promise(resolve =>
          this.setState(
            {
              ids: (Object.values(resp.elems) as Array<{
                id: number;
                failed?: true;
                failed_message?: string;
                resolved?: true;
              }>).map(el => ({
                id: el.id,
                status: el.failed
                  ? 'failed'
                  : el.resolved ? 'complete' : 'pending',
                failedMessage: el.failed_message,
              })),
            },
            resolve,
          ),
        );
      } catch (e) {
        console.error(e);
        failures += 1;
        if (failures >= 4) {
          this.setState({
            error:
              "We couldn't check the status of your import for a while. Please check your connection and contact support.",
          });
          return;
        }
      }
    }
    this.props.onComplete();
  }

  renderStatusTip(item: Item) {
    if (item.status === 'pending') {
      return 'Pending';
    }
    if (item.status === 'failed') {
      return (
        <React.Fragment>
          <b>Failed</b>
          {item.failure_message}
        </React.Fragment>
      );
    }
    return 'Complete';
  }

  renderProgress() {
    const {ids} = this.state;
    if (!ids) {
      return <Callout type="info">Waiting for server to respond…</Callout>;
    }
    return (
      <React.Fragment>
        <StatusWrap>{`Importing ${ids.length} assets…`}</StatusWrap>
        <BulkProgressWrapper>
          {ids.sort(({id: a}, {id: b}) => a - b).map(item => (
            <TooltipContainer
              key={item.id}
              tooltipContent={this.renderStatusTip(item)}
            >
              <ItemStatus $status={item.status} />
            </TooltipContainer>
          ))}
        </BulkProgressWrapper>
      </React.Fragment>
    );
  }

  render() {
    if (this.state.error) {
      return (
        <Card style={cardStyle} whiteBack>
          <DashboardTitle>
            A problem was encountered while importing.
          </DashboardTitle>
          <P style={{marginBottom: 12}}>
            Please contact support using the chat icon in the lower right of
            this page. We'll be happy to help resolve your import for you and
            make sure your content finishes moving to Pinecast as smoothly as
            possible.
          </P>
          <Callout type="negative">{this.state.error}</Callout>
        </Card>
      );
    }
    return (
      <Card style={cardStyle} whiteBack>
        <DashboardTitle>Perfect, we've started the import.</DashboardTitle>
        <P>It should take less than two minutes to import your podcast.</P>
        <Hr style={{marginTop: -4}} />
        {this.renderProgress()}
      </Card>
    );
  }
}
