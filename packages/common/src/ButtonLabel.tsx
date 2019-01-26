import * as React from 'react';

import Group from '@pinecast/common/Group';
import styled from '@pinecast/styles';

const Text = styled('span');

type Props = {
  children: React.ReactNode;
  message: React.ReactNode;
  position?: 'left' | 'right';
  type?: 'positive' | 'negative';
};

const ButtonLabel = ({children, message, position = 'right', type}: Props) => (
  <Group spacing={8} wrapperStyle={{alignItems: 'center'}}>
    {position === 'right' && <React.Fragment>{children}</React.Fragment>}
    <Text
      style={{
        color:
          type === 'positive'
            ? '#259461'
            : type === 'negative'
              ? '#bf1d1d'
              : '#616669',
        fontSize: 14,
      }}
    >
      {message}
    </Text>
    {position === 'left' && <React.Fragment>{children}</React.Fragment>}
  </Group>
);

export default ButtonLabel;
