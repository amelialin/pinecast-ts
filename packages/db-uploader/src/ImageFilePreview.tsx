import * as React from 'react';

import Card from '@pinecast/common/Card';
import styled from '@pinecast/styles';

import Asset from './assets';
import ImageViewer from './ImageViewer';
import prettyBytes from './formatSize';
import ReadyToUploadOverlay from './ReadyToUploadOverlay';

const ClearButton = styled(
  'button',
  {
    appearance: 'none',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    background: 'transparent',
    border: 0,
    color: '#888',
    cursor: 'pointer',
    fontSize: 16,
    padding: '5px 10px',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  {type: 'button'},
);
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
    style={{
      alignItems: 'center',
      flexDirection: 'row',
      lineHeight: '1.5em',
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
    <ClearButton
      onClick={e => {
        e.preventDefault();
        onRemove();
      }}
    >
      &times;
    </ClearButton>
  </Card>
);
