import * as React from 'react';

import Callout from '@pinecast/common/Callout';
import Hr from '@pinecast/common/HorizontalRule';
import {InlineCode} from '@pinecast/common/Text';
import styled from '@pinecast/styles';

const ErrorDetails = styled('p', {
  fontSize: 14,
  margin: '12px 0',
});

const EpisodeStatus = (props: {episodes: number; ignoredEpisodes: number}) => {
  if (!props.episodes) {
    return (
      <React.Fragment>
        <Hr />
        <Callout type="negative">
          This feed doesn't contain any episodes that we can import. Please
          contact support.
        </Callout>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Hr />
      <Callout type="info">
        {props.episodes === 1
          ? "We're about to import one episode."
          : `We\'re about to import ${props.episodes} episodes.`}
      </Callout>
      {Boolean(props.ignoredEpisodes) && (
        <React.Fragment>
          <Callout type="negative">
            {props.ignoredEpisodes === 1
              ? "We're not able to import one episode from this feed."
              : `We\'re not able to import ${
                  props.ignoredEpisodes
                } episodes from this feed.`}
          </Callout>
          <ErrorDetails>
            Episodes that cannot be imported usually lack an{' '}
            <InlineCode>&lt;enclosure /&gt;</InlineCode> tag. Please contact
            support for more information.
          </ErrorDetails>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EpisodeStatus;
