import * as React from 'react';

import Completed from './components/Completed';
import DoImport from './components/DoImport';
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
    feedURL: string | null;
    step: 'fetchFeed' | 'review' | 'importing' | 'complete';
  } = {
    feed: null,
    feedURL: null,
    step: 'fetchFeed',
  };

  handleGotFeed = (feedURL: string, feed: Feed) => {
    this.setState({feedURL, feed, step: 'review'});
  };

  handleFeedReviewed = (feed: Feed) => {
    this.setState({feed, step: 'importing'});
  };

  handleComplete = () => {};

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
      case 'importing':
        if (!this.state.feed) {
          throw new Error('unreachable');
        }
        return (
          <DoImport feed={this.state.feed} onComplete={this.handleComplete} />
        );
      case 'complete':
        if (!this.state.feedURL) {
          throw new Error('unreachable');
        }
        return <Completed feedURL={this.state.feedURL} />;
    }
  }
}
