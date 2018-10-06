import * as React from 'react';

import styled from '@pinecast/styles';

import Button from '../Button';
import Card from '../Card';
import Progress from '../Progress';
import TimeRemainingIndicator from './TimeRemainingIndicator';

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

type OngoingUpload = {
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
        <TaskDescription>Uploading to Pinecast…</TaskDescription>
        {uploads.map(({name, percent}, i) => (
          <React.Fragment key={i}>
            {name ? <div>{name}</div> : null}
            <ProgressWrapper>
              <Progress
                percent={percent}
                style={{flex: '1 1', marginRight: 12}}
              />
              {percent === 100 ? (
                'Complete'
              ) : (
                <TimeRemainingIndicator
                  progress={percent}
                  startTime={this.state.started}
                />
              )}
            </ProgressWrapper>
          </React.Fragment>
        ))}
        <Button
          onClick={onAbort}
          size="small"
          style={{alignSelf: 'flex-start'}}
        >
          Cancel
        </Button>
      </Card>
    );
  }
}
