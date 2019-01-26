import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import Collapser from '@pinecast/common/Collapser';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Progress from '@pinecast/common/Progress';

import prettyBytes from '../formatSize';
import StorageFull from '../icons/storage-full';
import StoragePartial from '../icons/storage-partial';

const messages = defineMessages({
  surgeRemaining: {
    id: 'db-uploader.Storage.surgeRemaining',
    description:
      'Label for a bar showing how much a Surge bonus a user has on their podcast.',
    defaultMessage: 'Surge remaining:',
  },

  ctaCollapse: {
    id: 'db-uploader.Storage.ctaCollapse',
    description: 'Button to collapse details about upload bonus',
    defaultMessage: 'Collapse',
  },
  ctaShowMore: {
    id: 'db-uploader.Storage.ctaShowMore',
    description: 'Button to show more details about upload bonus',
    defaultMessage: 'Show more',
  },

  limitLabel: {
    id: 'db-uploader.Storage.limitLabel',
    description: 'Label for file size limit. {size} is the size limit',
    defaultMessage: 'You can upload files up to {size}.',
  },
  limitLabelVerbose: {
    id: 'db-uploader.Storage.limitLabelVerbose',
    description:
      'Label for file size limit in a more verbose form. {size} is the size limit',
    defaultMessage: 'This podcast may have audio files as large as {size}.',
  },
  surgeFree: {
    id: 'db-uploader.Storage.surgeFree',
    description: "Label that free accounts don't have upload Surge",
    defaultMessage:
      'This podcast is on a free plan, so there is no upload surge.',
  },
  surgePaid: {
    id: 'db-uploader.Storage.surgePaid',
    description:
      'Label that paid accounts have upload Surge. {size} is the amount.',
    defaultMessage: 'This podcast has {size} of upload surge available.',
  },
});

export default class Storage extends React.PureComponent {
  props: {
    limit: number;
    plan: 'demo' | 'pro' | 'starter' | 'community';
    surge: number;
  };
  state: {open: boolean} = {open: false};

  toggle = () => this.setState({open: !this.state.open});

  render() {
    const {
      props: {limit, plan, surge},
      state: {open},
    } = this;
    const IconComponent = surge < limit ? StoragePartial : StorageFull;
    return (
      <Card
        whiteBack
        style={{
          backgroundColor: open
            ? 'rgba(255, 255, 255, 0.75)'
            : 'rgba(255, 255, 255, 0.3)',
          marginTop: 15,
          transition: 'background-color 0.3s',
        }}
      >
        <div style={{display: 'flex'}}>
          <IconComponent style={{flex: '0 0 23px', marginRight: 10}} />
          <div style={{flex: '1 1', fontSize: 14, fontWeight: 500}}>
            <FormattedMessage
              {...messages.limitLabel}
              values={{size: prettyBytes(limit + surge)}}
            />
          </div>
          <Button onClick={this.toggle}>
            {open ? (
              <FormattedMessage {...messages.ctaCollapse} />
            ) : (
              <FormattedMessage {...messages.ctaShowMore} />
            )}
          </Button>
        </div>
        <Collapser open={open} shave={0}>
          <div style={{paddingLeft: 33}}>
            <div>
              <FormattedMessage
                {...messages.limitLabelVerbose}
                values={{size: prettyBytes(limit)}}
              />
            </div>
            {plan === 'demo' ? (
              <div>
                <FormattedMessage {...messages.surgeFree} />
              </div>
            ) : (
              <div>
                <FormattedMessage
                  {...messages.surgePaid}
                  values={{size: prettyBytes(surge)}}
                />
              </div>
            )}
            {plan !== 'demo' && (
              <div style={{alignItems: 'center', display: 'flex'}}>
                <span
                  style={{flex: '0 0', marginRight: 10, whiteSpace: 'nowrap'}}
                >
                  <FormattedMessage {...messages.surgeRemaining} />
                </span>
                <Progress percent={surge / limit * 100} style={{flex: '1 1'}} />
              </div>
            )}
          </div>
        </Collapser>
      </Card>
    );
  }
}
