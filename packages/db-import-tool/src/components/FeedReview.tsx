import * as React from 'react';

import Card from '@pinecast/common/Card';
import {DashboardTitle, P} from '@pinecast/common/Text';
import styled, {CSS} from '@pinecast/styles';

import {Feed} from '../types';

const cardStyle: CSS = {
  margin: '40px auto',
  maxWidth: 600,
};

export default class FeedReview extends React.Component {
  props: {
    feed: Feed;
  };
  state: {
    feed: Feed;
  };

  constructor(props) {
    super(props);
    this.state = {
      feed: props.feed,
    };
  }

  render() {
    return (
      <Card style={cardStyle} whiteBack>
        <DashboardTitle>Perfect, let's review your feed.</DashboardTitle>
        <P>
          We've collected all of the data we need about your show. Give it a
          look over and make sure we've got everything right.
        </P>
      </Card>
    );
  }
}
