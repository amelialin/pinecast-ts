import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Dropzone from '@pinecast/common/Dropzone';

const messages = defineMessages({
  label: {
    id: 'db-uploader.AudioFilePicker.label',
    description: 'Label for dropzone for audio upload',
    defaultMessage: 'Drop an MP3 file here.',
  },
});

export default ({onGetFile}: {onGetFile: (file: File) => void}) => (
  <label style={{display: 'block'}}>
    <Dropzone
      accept="audio/mpeg, audio/mp3, audio/aac, audio/m4a, audio/x-m4a"
      label={<FormattedMessage {...messages.label} />}
      onChange={onGetFile}
    />
  </label>
);
