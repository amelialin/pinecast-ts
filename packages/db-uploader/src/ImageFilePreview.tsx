import * as React from 'react';

import Card from '@pinecast/common/Card';
import DeleteButton from '@pinecast/common/DeleteButton';
import styled from '@pinecast/styles';

import Asset from './assets';
import ImageViewer from './ImageViewer';
import prettyBytes from './formatSize';
import ReadyToUploadOverlay from './ReadyToUploadOverlay';

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
const BlockStrong = styled('strong', {display: 'block'});

export default ({
  isUploaded = true,
  name,
  onRemove,
  size = null,
  source,
}: {
  isUploaded?: boolean;
  name: string;
  onRemove: () => void;
  size?: number | null;
  source: string | Asset;
}) => (
  <Card
    whiteBack
    style={{
      alignItems: 'center',
      flexDirection: 'row',
      lineHeight: '1.5em',
      position: 'relative',
    }}
  >
    <ImageViewer
      height={46}
      source={source}
      style={{marginRight: '1em'}}
      width={46}
    />
    <Column>
      <BlockStrong>{name}</BlockStrong>
      {size !== null && <div>{prettyBytes(size)}</div>}
    </Column>
    {!isUploaded && <ReadyToUploadOverlay />}
    <DeleteButton
      onClick={onRemove}
      style={{position: 'absolute', right: 8, top: 8}}
    />
  </Card>
);
