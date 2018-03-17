import * as React from 'react';

import styled from '@pinecast/styles';

import Button from '../Button';
import Card from '../Card';
import Progress from '../Progress';

const Wrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingTop: 4,
});
const TaskDescription = styled('span', {
  display: 'block',
  fontWeight: 500,
  marginBottom: 12,
  width: '100%',
});

const ImageUploadProgress = ({
  onAbort,
  percent,
}: {
  onAbort: () => void;
  percent: number;
}) => (
  <Card style={{textAlign: 'center'}}>
    <Wrapper>
      <TaskDescription>Uploading to Pinecast…</TaskDescription>
      <Progress percent={percent} style={{marginBottom: 16, width: '100%'}} />
      <Button onClick={onAbort} size="small">
        Cancel
      </Button>
    </Wrapper>
  </Card>
);

export default ImageUploadProgress;
