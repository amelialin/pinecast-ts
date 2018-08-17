import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {gettext} from '@pinecast/i18n';

import Asset from '../assets';
import ImageViewer from '../ImageViewer';
import ReplaceImage from '../icons/replace-image';

export default ({
  existingSource,
  newSource,
  onChooseExisting,
  onChooseNew,
}: {
  existingSource: string;
  newSource: Asset;
  onChooseExisting: () => void;
  onChooseNew: () => void;
}) => (
  <Card style={{textAlign: 'center'}}>
    <ReplaceImage width={46} height={42} style={{margin: '0 auto'}} />
    <b style={{display: 'block', marginBottom: '0.25em'}}>
      {gettext('Replace episode artwork?')}
    </b>
    <span style={{display: 'block', marginBottom: '0.75em'}}>
      {gettext(
        'This MP3 contains artwork, but this episode has artwork already. Should we use the new image?',
      )}
    </span>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{marginRight: 15}}>
        <ImageViewer
          height={50}
          width={50}
          source={existingSource}
          style={{display: 'block', margin: '0 auto'}}
        />
        <b>{gettext('Existing')}</b>
      </div>
      <div>
        <ImageViewer
          height={50}
          width={50}
          source={newSource}
          style={{display: 'block', margin: '0 auto'}}
        />
        <b>{gettext('New')}</b>
      </div>
    </div>
    <div>
      <Button onClick={onChooseExisting}>{gettext('Use Existing')}</Button>
      <Button onClick={onChooseNew} $isPrimary style={{marginRight: 0}}>
        {gettext('Use New')}
      </Button>
    </div>
  </Card>
);
