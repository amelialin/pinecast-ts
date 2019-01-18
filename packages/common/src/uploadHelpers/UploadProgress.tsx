import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import styled from '@pinecast/styles';

import Button from '../Button';
import Card from '../Card';
import Callout from '../Callout';
import Progress from '../Progress';
import TimeRemainingIndicator from './TimeRemainingIndicator';

const messages = defineMessages({
  heading: {
    id: 'common.UploadProgress.heading',
    description: 'Heading for upload progress',
    defaultMessage: 'Uploading to Pinecast…',
  },
  complete: {
    id: 'common.UploadProgress.complete',
    description: 'Status of completed upload',
    defaultMessage: 'Complete',
  },
  cancel: {
    id: 'common.UploadProgress.cancel',
    description: 'CTA to cancel an upload',
    defaultMessage: 'Cancel',
  },
});

const TaskDescription = styled('span', {
  display: 'block',
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 12,
  width: '100%',
});
const ProgressWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  marginBottom: 16,
});
const UploadName = styled('div', {
  display: 'block',
  fontSize: 13,
});

type OngoingUpload = {
  error?: React.ReactNode;
  name?: React.ReactNode;
  percent: number;
};

export default class UploadProgress extends React.Component {
  props: {
    onAbort: () => void;
    uploads: Array<OngoingUpload>;
  };
  state: {started: number} = {started: Date.now()};

  render() {
    const {onAbort, uploads} = this.props;
    return (
      <Card whiteBack>
        <TaskDescription>
          <FormattedMessage {...messages.heading} />
        </TaskDescription>
        {uploads.map(({error, name, percent}, i) => (
          <React.Fragment key={i}>
            {name ? <UploadName>{name}</UploadName> : null}
            {error ? (
              <Callout type="negative">{error}</Callout>
            ) : (
              <ProgressWrapper>
                <Progress
                  percent={percent}
                  style={{flex: '1 1', marginRight: 12}}
                />
                {percent === 100 ? (
                  <FormattedMessage {...messages.complete} />
                ) : (
                  <TimeRemainingIndicator
                    progress={percent}
                    startTime={this.state.started}
                  />
                )}
              </ProgressWrapper>
            )}
          </React.Fragment>
        ))}
        <Button
          onClick={onAbort}
          size="small"
          style={{alignSelf: 'flex-start'}}
        >
          <FormattedMessage {...messages.cancel} />
        </Button>
      </Card>
    );
  }
}
