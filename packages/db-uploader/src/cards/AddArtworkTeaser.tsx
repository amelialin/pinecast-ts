import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Dialog from '@pinecast/common/Dialog';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import {P} from '@pinecast/common/Text';

const messages = defineMessages({
  title: {
    id: 'db-uploader.AddArtworkTeaser.title',
    description: 'Title of the card to add artwork',
    defaultMessage: 'Add episode artwork?',
  },
  dialogTitle: {
    id: 'db-uploader.AddArtworkTeaser.dialogTitle',
    description: 'Title of the dialog confirming adding artwork',
    defaultMessage: 'Clear audio?',
  },
  dialogCopy: {
    id: 'db-uploader.AddArtworkTeaser.dialogCopy',
    description: 'Copy of the dialog confirming the addition of artwork',
    defaultMessage:
      'Adding artwork now will update your podcast website and directory listings like Apple Podcasts and Google Play. To also update the artwork seen in apps, you will need to also re-upload your audio file.',
  },
  actionsCancel: {
    id: 'db-uploader.AddArtworkTeaser.actionsCancel',
    description: 'Button to cancel the upload',
    defaultMessage: 'Cancel',
  },
  actionsClearAudio: {
    id: 'db-uploader.AddArtworkTeaser.actionsClearAudio',
    description: 'Button to clear the audio file',
    defaultMessage: 'Replace audio',
  },
  actionsJustArtwork: {
    id: 'db-uploader.AddArtworkTeaser.actionsJustArtwork',
    description: 'Button to just add artwork, not clear audio',
    defaultMessage: 'Just add artwork',
  },

  add: {
    id: 'db-uploader.AddArtworkTeaser.addButton',
    description: 'Button to add artwork',
    defaultMessage: 'Add',
  },
});

export default ({
  onClearAudio,
  onAddArtwork,
}: {
  onClearAudio: () => void;
  onAddArtwork: () => void;
}) => (
  <Card
    whiteBack
    style={{alignItems: 'center', flexDirection: 'row', fontWeight: 500}}
  >
    <FormattedMessage {...messages.title} />
    <ModalOpener
      renderModal={({handleClose}) => (
        <Dialog
          actions={
            <ButtonGroup>
              <Button onClick={handleClose}>
                <FormattedMessage {...messages.actionsCancel} />
              </Button>
              <Button onClick={onAddArtwork}>
                <FormattedMessage {...messages.actionsJustArtwork} />
              </Button>
              <Button onClick={onClearAudio} $isPrimary>
                <FormattedMessage {...messages.actionsClearAudio} />
              </Button>
            </ButtonGroup>
          }
          title={<FormattedMessage {...messages.dialogTitle} />}
        >
          <P style={{paddingRight: 0}}>
            <FormattedMessage {...messages.dialogCopy} />
          </P>
        </Dialog>
      )}
    >
      {({handleOpen}) => (
        <Button onClick={handleOpen} size="small" style={{marginLeft: 16}}>
          <FormattedMessage {...messages.add} />
        </Button>
      )}
    </ModalOpener>
  </Card>
);
