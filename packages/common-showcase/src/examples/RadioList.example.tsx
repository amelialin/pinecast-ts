import * as React from 'react';

import {Check, Cross} from '@pinecast/common/icons';
import RadioList from '@pinecast/common/RadioList';
import styled from '@pinecast/styles';

const Wrapper = styled('div', {display: 'flex', flexDirection: 'column'});

export default {
  name: 'RadioList',
  callout: [
    {
      type: 'negative',
      value: 'Currently does not have proper focus states',
    },
  ],
  examples: [
    {
      title: 'Use with strings',
      render: () => (
        <RadioList
          onChange={() => {}}
          options={{
            podcast: 'Podcast',
            network: 'Network',
            site: 'Site',
            blog: 'Blog',
          }}
          value="podcast"
        />
      ),
    },
    {
      title: 'Use with rendered elements',
      render: () => (
        <RadioList
          onChange={() => {}}
          options={{
            podcast: (
              <Wrapper>
                <b>Podcast</b>
                <span>This is a little description</span>
              </Wrapper>
            ),
            network: (
              <Wrapper>
                <b>Network</b>
                <span>This is a little description</span>
              </Wrapper>
            ),
            site: (
              <Wrapper>
                <b>Site</b>
                <span>This is a little description</span>
              </Wrapper>
            ),
            blog: (
              <Wrapper>
                <b>Blog</b>
                <span>This is a little description</span>
              </Wrapper>
            ),
          }}
          value="podcast"
        />
      ),
    },
    {
      title: 'Use with components',
      render: () => (
        <RadioList
          onChange={() => {}}
          options={{
            check: Check,
            cross: Cross,
          }}
          value="cross"
        />
      ),
    },
  ],
};
