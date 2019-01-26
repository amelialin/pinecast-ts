import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Dropzone from '@pinecast/common/Dropzone';

const messages = defineMessages({
  label: {
    id: 'db-uploader.ImageFilePicker.label',
    description: 'Label for dropzone for image upload',
    defaultMessage: 'Drop a PNG or JPEG file here.',
  },
});

export default ({onGetFile}: {onGetFile: (file: File) => void}) => (
  <label style={{display: 'block'}}>
    <Dropzone
      accept="image/jpg, image/jpeg, image/png"
      label={<FormattedMessage {...messages.label} />}
      onChange={onGetFile}
    />
  </label>
);
