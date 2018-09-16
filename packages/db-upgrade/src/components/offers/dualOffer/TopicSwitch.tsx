import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled from '@pinecast/styles';

import topicData, {Topics} from './topicData';

const breakpoint = '@media (max-width: 900px)';

const Wrapper = styled('div', {
  alignItems: 'flex-start',
  display: 'inline-flex',
  flexDirection: 'column',
  margin: '0 auto 20px',
  width: 'auto',

  [breakpoint]: {
    display: 'flex',
    maxWidth: 'calc(100% - 20px)',
  },
  textAlign: 'center',
});

const Label = styled(
  'strong',
  {
    flex: '0 0',
    fontWeight: 500,
    marginBottom: 12,
    padding: '4px 0',
    whiteSpace: 'nowrap',

    [breakpoint]: {
      textAlign: 'left',
      width: '100%',
    },
  },
  {children: 'Tell me about…'},
);

const TopicWrapper = styled('div', {
  display: 'flex',
  flex: '1 1',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
});

const TopicOption = styled(
  'button',
  ({$selected}: {$selected: boolean}) => ({
    backgroundColor: $selected
      ? 'rgba(201, 217, 224, 1)'
      : 'rgba(201, 217, 224, 0)',
    border: 0,
    borderRadius: 3,
    boxShadow: $selected ? '0 0 8px 0 #b7c9d1' : '0 0 0 transparent',
    color: '#32586e',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    padding: '4px 8px',
    marginBottom: 8,
    marginRight: 8,
    transition: 'background-color 0.2s, box-shadow 0.2s',
    whiteSpace: 'nowrap',

    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      backgroundColor: $selected ? 'rgba(201, 217, 224, 1)' : '#ebf2f5',
      boxShadow: $selected ? '0 0 0 transparent' : undefined,
      outline: 'none',
      textDecoration: 'none',
    },
    ':active': {
      backgroundColor: $selected ? 'rgba(201, 217, 224, 1)' : '#b7c9d1',
      boxShadow: $selected ? '0 0 0 transparent' : undefined,
      textDecoration: 'none',
    },
  }),
  {type: 'button'},
);

const TopicSwitch = ({
  onChange,
  value,
}: {
  onChange: (newTopic: Topics) => void;
  value: Topics;
}) => (
  <Wrapper>
    <Label />
    <TopicWrapper>
      {Object.keys(topicData)
        .sort((a, b) => a.localeCompare(b))
        .map(topic => (
          <TopicOption
            $selected={value === topic}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onChange(topic);
            }}
            key={topic}
          >
            {topicData[topic].name}
          </TopicOption>
        ))}
    </TopicWrapper>
  </Wrapper>
);

export default TopicSwitch;
