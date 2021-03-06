import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import styled from '@pinecast/styles';

const messages = defineMessages({
  label: {
    id: 'db-uploader.ReadyToUploadOverlay.label',
    description: 'Message shown when a file is ready to upload',
    defaultMessage: 'Ready to upload',
  },
});

export default styled(
  'div',
  {
    alignItems: 'center',
    background:
      'rgba(255, 255, 255, 0.6) repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75) 2px, transparent 2px, transparent 5px)',
    bottom: 0,
    color: '#777',
    display: 'flex',
    fontWeight: 500,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: 0,
    zIndex: 10,
  },
  {children: <FormattedMessage {...messages.label} />},
);
