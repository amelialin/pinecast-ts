import * as React from 'react';

import {defineMessages, injectIntl, InjectedIntlProps} from '@pinecast/i18n';
import styled from '@pinecast/styles';

const messages = defineMessages({
  title: {
    id: 'common.RequiredPlaceholder.title',
    description:
      'Message shown when trying to submit a form without uploading a file.',
    defaultMessage: 'You must upload a file.',
  },
});

export default injectIntl(({intl}: InjectedIntlProps) =>
  React.createElement(
    styled(
      'input',
      {
        appearance: 'none',
        MozAppearance: 'none',
        WebkitAppearance: 'none',
        border: 0,
        height: 0,
        margin: 0,
        opacity: 0.00001,
        padding: 0,
        width: 0,
      },
      {
        className: 'required-placeholder',
        required: true,
        title: intl.formatMessage(messages.title),
        type: 'text',
      },
    ),
  ),
) as React.ComponentType<{}>;
