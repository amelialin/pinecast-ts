import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';

import Asset from '../assets';
import ImageViewer from '../ImageViewer';
import ReplaceImage from '../icons/replace-image';

const messages = defineMessages({
  promptReplaceArtwork: {
    id: 'db-uploader.ReplaceArtwork.promptReplaceArtwork',
    description: 'Prompt to replace existing episode artwork',
    defaultMessage: 'Replace episode artwork?',
  },
  bodyReplaceArtwork: {
    id: 'db-uploader.ReplaceArtwork.bodyReplaceArtwork',
    description: 'Copy for prompt to replace existing episode artwork',
    defaultMessage:
      'This MP3 contains artwork, but this episode has artwork already. Should we use the new image?',
  },

  labelExisting: {
    id: 'db-uploader.ReplaceArtwork.labelExisting',
    description: 'Label for existing artwork',
    defaultMessage: 'Existing',
  },
  labelNew: {
    id: 'db-uploader.ReplaceArtwork.labelNew',
    description: 'Label for new artwork',
    defaultMessage: 'New',
  },
  ctaExisting: {
    id: 'db-uploader.ReplaceArtwork.ctaExisting',
    description: 'CTA for existing artwork',
    defaultMessage: 'Use existing',
  },
  ctaNew: {
    id: 'db-uploader.ReplaceArtwork.ctaNew',
    description: 'CTA for new artwork',
    defaultMessage: 'Use new',
  },
});

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
  <Card style={{textAlign: 'center'}} whiteBack>
    <ReplaceImage width={46} height={42} style={{margin: '0 auto'}} />
    <b style={{display: 'block', marginBottom: '0.25em'}}>
      <FormattedMessage {...messages.promptReplaceArtwork} />
    </b>
    <span style={{display: 'block', marginBottom: '0.75em'}}>
      <FormattedMessage {...messages.bodyReplaceArtwork} />
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
        <b>
          <FormattedMessage {...messages.labelExisting} />
        </b>
      </div>
      <div>
        <ImageViewer
          height={50}
          width={50}
          source={newSource}
          style={{display: 'block', margin: '0 auto'}}
        />
        <b>
          <FormattedMessage {...messages.labelNew} />
        </b>
      </div>
    </div>
    <ButtonGroup>
      <Button onClick={onChooseExisting}>
        <FormattedMessage {...messages.ctaExisting} />
      </Button>
      <Button onClick={onChooseNew} $isPrimary style={{marginRight: 0}}>
        <FormattedMessage {...messages.ctaNew} />
      </Button>
    </ButtonGroup>
  </Card>
);
