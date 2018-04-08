import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import {CSS} from '@pinecast/styles';
import Label from '@pinecast/common/Label';
import {DashboardTitle, P} from '@pinecast/common/Text';
import TextInput from '@pinecast/common/TextInput';
import xhr from '@pinecast/xhr';

import {Feed} from '../types';

const cardStyles: CSS = {
  margin: '20px auto',
  maxWidth: 600,
};

declare var Rollbar: any;

export default class FeedFetch extends React.PureComponent {
  props: {
    feedFetchURL: string;
    onGotFeed: (feed: Feed) => void;
  };
  state: {
    error: string | null;
    feedURL: string;
    fetching: boolean;
    requiresFeed: boolean;
  } = {error: null, feedURL: '', fetching: false, requiresFeed: false};

  form: HTMLFormElement | null = null;

  handleFeedURLChange = (newFeedURL: string) => {
    this.setState({feedURL: newFeedURL, requiresFeed: !newFeedURL});
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.submit();
  };

  submit = async () => {
    if (!this.form) {
      return;
    }
    if (!this.form.checkValidity()) {
      this.setState({requiresFeed: true});
      return;
    }
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

    // TODO: replace this with something that runs on the client
    try {
      const body = new FormData();
      body.append('feed', feedContent);
      const feed = JSON.parse(
        await xhr({method: 'POST', body, url: '/dashboard/import/feed'}),
      );

      if (feed.error) {
        let error: string;
        switch (feed.error) {
          case 'invalid encoding':
            error =
              'We downloaded your RSS feed, but it was not encoded in a format that we could understand. Please contact Pinecast support.';
            break;
          case 'invalid xml':
            error =
              'We downloaded your RSS feed, but it was not a valid RSS feed that we could import. Please contact Pinecast support.';
            break;
          case 'invalid format':
            error = feed.details;
            break;
          default:
            error =
              'We encountered an unexpected error while trying to extract information from your feed. Please contact Pinecast support.';
        }
        this.setState({error, fetching: false});
        return;
      }

      this.props.onGotFeed(feed);
    } catch (e) {
      Rollbar.error('Problem parsing feed during import', {error: e});
      this.setState({
        error: 'There was a problem parsing your feed.',
        fetching: false,
      });
      return;
    }
  };

  handleRef = (el: HTMLFormElement | null) => {
    this.form = el;
  };

  render() {
    return (
      <Card style={cardStyles} whiteBack>
        <form onSubmit={this.handleSubmit} ref={this.handleRef}>
          <DashboardTitle>Where are we importing from?</DashboardTitle>
          <P>You can import from an RSS feed URL or an iTunes listing URL.</P>
          <Label text="Feed URL or iTunes listing URL">
            <TextInput
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
        </form>
      </Card>
    );
  }
}
