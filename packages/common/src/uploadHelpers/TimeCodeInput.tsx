import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import styled from '@pinecast/styles';

import Group from '../Group';
import Label from '../Label';
import NumberInput from '../NumberInput';

const Divider = styled(
  'span',
  {
    alignSelf: 'center',
    display: 'inline-flex',
    fontSize: 20,
    marginTop: -4,
  },
  {children: ':'},
);

const messages = defineMessages({
  timecodeLabel: {
    id: 'common.TimeCodeInput.timecode.label',
    description: 'Description for the timecode field',
    defaultMessage: 'Timecode',
  },
});

type Props = {
  timecode: number;
};

const TimeCodeInput = ({timecode}: Props) => (
  <Group spacing={8}>
    <Label
      style={{marginBottom: 0}}
      text={<FormattedMessage {...messages.timecodeLabel} />}
    >
      <Group spacing={4}>
        <NumberInput
          canBeNegative={false}
          readOnly
          style={{textAlign: 'center', width: 40}}
          value={Math.floor(timecode / 3600)}
        />
        <Divider />
        <NumberInput
          canBeNegative={false}
          readOnly
          style={{textAlign: 'center', width: 40}}
          value={Math.floor((timecode % 3600) / 60)}
        />
        <Divider />
        <NumberInput
          canBeNegative={false}
          readOnly
          style={{textAlign: 'center', width: 48}}
          trimZeroes={false}
          upToPrecision={1}
          value={timecode % 60}
        />
      </Group>
    </Label>
  </Group>
);

export default TimeCodeInput;
