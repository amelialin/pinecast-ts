import * as React from 'react';

import Card from '@pinecast/common/Card';
import DeleteButton from '@pinecast/common/DeleteButton';
import {gettext} from '@pinecast/i18n';

import Cassette from './icons/cassette';
import prettyBytes from './formatSize';
import ReadyToUploadOverlay from './ReadyToUploadOverlay';

function lpad(str: string | number, length: number, pad: string): string {
  str = String(str);
  if (str.length >= length) {
    return str;
  }
  return (new Array(length - str.length + 1).join(pad) + str).substr(
    -1 * length,
  );
}

export default ({
  duration,
  isUploaded = false,
  name,
  onCancel,
  size,
  url,
}: {
  duration: number | null;
  isUploaded?: boolean;
  name: string;
  onCancel: () => void;
  size: number | null;
  url: string | null;
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
    <Cassette width={46} height={34} style={{marginRight: '1em'}} />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <strong style={{display: 'block'}}>{name}</strong>
      {(duration || size || url) && (
        <div>
          {duration != null && (
            <span>
              {(duration / 3600) | 0}:
              {lpad(((duration % 3600) / 60) | 0, 2, '0')}:
              {lpad((duration % 60) | 0, 2, '0')}
            </span>
          )}
          {Boolean(duration && size) && ' • '}
          {size != null && <span>{prettyBytes(size)}</span>}
          {Boolean((duration || size) && url) && ' • '}
          {url && (
            <a href={url} download>
              {gettext('Download')}
            </a>
          )}
        </div>
      )}
    </div>
    {!isUploaded && <ReadyToUploadOverlay />}
    <DeleteButton
      onClick={onCancel}
      style={{position: 'absolute', right: 8, top: 8}}
    />
  </Card>
);
