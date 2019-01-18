import * as React from 'react';

import Card from '@pinecast/common/Card';
import {FormattedMessage} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';

import {AnalyticsView} from './constants';
import {ErrorIcon} from '@pinecast/common/icons';
import notes from './notes';

const Notes = ({view}: {view: AnalyticsView}) => {
  const messages = notes[view];
  if (!messages || !messages.length) {
    return null;
  }

  return (
    <Card
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        marginTop: -8,
        padding: 12,
      }}
    >
      {messages.map((message, i) => (
        <Group
          key={i}
          spacing={4}
          wrapperStyle={{
            alignItems: 'center',
            ':not(:last-of-type)': {marginBottom: 10},
          }}
        >
          <ErrorIcon color="#58595B" height={16} />
          <span>
            <FormattedMessage {...message} />
          </span>
        </Group>
      ))}
    </Card>
  );
};

export default Notes;
