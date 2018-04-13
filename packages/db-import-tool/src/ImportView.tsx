import * as React from 'react';

import {Feed} from './types';
import FeedFetch from './components/FeedFetch';
import FeedReview from './components/FeedReview';
import PleaseUpgrade from './components/PleaseUpgrade';

export default class ImportView extends React.PureComponent {
  props: {
    feedFetchURL: string;
    isPaid: boolean;
  };
  state: {
    feed: Feed | null;
    step: 'fetchFeed' | 'review' | 'importing' | 'complete';
  } = {
    feed: null,
    step: 'fetchFeed',
  };

  handleGotFeed = (feed: Feed) => {
    this.setState({feed, step: 'review'});
  };

  handleFeedReviewed = (feed: Feed) => {
    this.setState({feed, step: 'importing'});
  };

  render() {
    if (!this.props.isPaid) {
      return <PleaseUpgrade />;
    }
    switch (this.state.step) {
      case 'fetchFeed':
        return (
          <FeedFetch
            feedFetchURL={this.props.feedFetchURL}
            onGotFeed={this.handleGotFeed}
          />
        );
      case 'review':
        if (!this.state.feed) {
          throw new Error('unreachable');
        }
        return (
          <FeedReview
            feed={this.state.feed}
            onFeedReviewed={this.handleFeedReviewed}
          />
        );
    }
  }
}
