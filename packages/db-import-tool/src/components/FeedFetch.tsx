import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import {CSS} from '@pinecast/styles';
import Form from '@pinecast/common/Form';
import Label from '@pinecast/common/Label';
import {DashboardTitle, P} from '@pinecast/common/Text';
import TextInput from '@pinecast/common/TextInput';
import xhr from '@pinecast/xhr';

import {Feed} from '../types';
import * as feedParser from './feedParser';

const cardStyles: CSS = {
  margin: '20px auto 100px',
  maxWidth: 600,
};

declare var Rollbar: any;

export default class FeedFetch extends React.PureComponent {
  props: {
    feedFetchURL: string;
    onGotFeed: (feedURL: string, feed: Feed) => void;
  };
  state: {
    error: string | null;
    feedURL: string;
    fetching: boolean;
    requiresFeed: boolean;
  } = {error: null, feedURL: '', fetching: false, requiresFeed: false};

  handleFeedURLChange = (newFeedURL: string) => {
    this.setState({feedURL: newFeedURL, requiresFeed: !newFeedURL});
  };

  handleSubmit = (isValid: boolean) => {
    if (!isValid) {
      this.setState({requiresFeed: true});
      return;
    }
    this.submit();
  };

  submit = async () => {
    this.setState({error: null, fetching: true});

    let token: string;
    try {
      token = JSON.parse(await xhr('/dashboard/services/get_request_token'))
        .token;
    } catch (e) {
      Rollbar.error('Problem getting import token from Pinecast', {error: e});
      this.setState({
        error: 'There was a problem contacting Pinecast.',
        fetching: false,
      });
      return;
    }

    let feedContent: string;
    try {
      feedContent = JSON.parse(
        await xhr(
          `${this.props.feedFetchURL}?token=${encodeURIComponent(
            token,
          )}&url=${encodeURIComponent(this.state.feedURL)}`,
        ),
      ).content;
    } catch (e) {
      Rollbar.error('Problem importing', {error: e});
      this.setState({
        error: 'There was a problem downloading your feed.',
        fetching: false,
      });
      return;
    }

    try {
      const feed = feedParser.parseFeed(feedContent);
      this.props.onGotFeed(this.state.feedURL, feed);
    } catch (e) {
      if (e instanceof feedParser.FormatError) {
        this.setState({error: e.message, fetching: false});
        return;
      }
      this.setState({
        error:
          'We were unable to parse the feed that you provided. Pleaes contact support.',
        fetching: false,
      });
      Rollbar.error('Problem parsing feed during import', {error: e});
    }
  };

  render() {
    return (
      <Card style={cardStyles} whiteBack>
        <Form onSubmit={this.handleSubmit}>
          <DashboardTitle>Where are we importing from?</DashboardTitle>
          <P>You can import from an RSS feed URL or an iTunes listing URL.</P>
          <Label text="Feed URL or iTunes listing URL">
            <TextInput
              autoFocus
              disabled={this.state.fetching}
              invalid={this.state.requiresFeed}
              onChange={this.handleFeedURLChange}
              placeholder="https://wtfpod.libsyn.com/rss"
              required
              type="url"
              value={this.state.feedURL || ''}
            />
          </Label>
          <Button
            onClick={this.submit}
            pending={this.state.fetching}
            type="submit"
          >
            Begin import
          </Button>
        </Form>
      </Card>
    );
  }
}
