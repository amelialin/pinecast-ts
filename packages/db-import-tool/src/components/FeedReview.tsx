import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import Checkbox from '@pinecast/common/Checkbox';
import {DashboardTitle, P} from '@pinecast/common/Text';
import Form from '@pinecast/common/Form';
import Label from '@pinecast/common/Label';
import {memoize} from '@pinecast/common/helpers';
import styled from '@pinecast/styles';
import SlugInput, {
  slugify,
  Status as SlugStatus,
} from '@pinecast/common/SlugInput';
import TextArea from '@pinecast/common/TextArea';
import TextInput from '@pinecast/common/TextInput';
import xhr from '@pinecast/xhr';

import {cardStyle, pageBreak} from './cardStyle';
import EpisodeStatus from './EpisodeStatus';
import {Feed} from '../types';

const Wrapper = styled('div', {
  display: 'flex',

  [pageBreak]: {
    flexDirection: 'column',
  },
});
const FormColumn = styled('div', {
  flex: '1 1',
  order: 1,
  paddingRight: 20,

  [pageBreak]: {
    order: 2,
    paddingTop: 20,
    paddingRight: 0,
  },
});
const CoverImage = styled('img', {
  borderRadius: 4,
  display: 'block',
  flex: '0 0 250px',
  height: 250,
  order: 2,
  width: 250,

  [pageBreak]: {
    order: 1,
  },
});

const SubmitWrapper = styled('div', {
  marginTop: 8,
});

const fieldRequiredError = 'This field is required';

export default class FeedReview extends React.Component {
  props: {feed: Feed; onFeedReviewed: (feed: Feed) => void};
  state: {
    errors: {[k in keyof Feed]?: string} | null;
    feed: Feed;
    slugValid: boolean;
  };

  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      feed: {...props.feed, slug: slugify(props.feed.name)},
      slugValid: false,
    };
  }

  canSubmit(): boolean {
    return Boolean(this.state.feed.items.length);
  }

  slugProvider = (newSlug: string) => {
    let abortResolve: () => void = () => {};
    const abortPromise = new Promise<void>(resolve => {
      abortResolve = resolve;
    });

    const promise = xhr({
      abortPromise,
      method: 'GET',
      url: `/dashboard/services/slug_available?slug=${encodeURIComponent(
        newSlug,
      )}`,
    })
      .then(resp => JSON.parse(resp))
      .then(parsed => (parsed.valid ? 'available' : 'unavailable'));

    return {status: promise, abort: abortResolve};
  };

  handleChange = memoize((field: string) => (newValue: string) => {
    this.setState({
      errors: {...this.state.errors, [field]: undefined},
      feed: {...this.state.feed, [field]: newValue},
    });
  });
  handleChangeExplicit = (newValue: boolean) => {
    this.setState({feed: {...this.state.feed, is_explicit: newValue}});
  };
  handleSlugStatusChange = (status: SlugStatus) => {
    this.setState({
      errors: {...this.state.errors, slug: undefined},
      slugValid: status === 'available',
    });
  };

  handleSubmit = () => {
    if (!this.canSubmit()) {
      return;
    }
    const {feed, slugValid} = this.state;

    const errors = {
      name: feed.name ? null : fieldRequiredError,
      slug: !feed.slug
        ? fieldRequiredError
        : !slugValid ? 'You must choose an available slug.' : null,
      homepage: feed.homepage ? null : fieldRequiredError,
      description: feed.description ? null : fieldRequiredError,
      language: feed.language ? null : fieldRequiredError,
      author_name: feed.author_name ? null : fieldRequiredError,
    };
    if (Object.values(errors).some(x => Boolean(x))) {
      this.setState({errors});
      return;
    }

    this.props.onFeedReviewed(feed);
  };

  render() {
    const {errors, feed} = this.state;

    return (
      <Card style={cardStyle} whiteBack>
        <DashboardTitle>Let's review your feed.</DashboardTitle>
        <P>
          We've collected all of the data we need about your show. Give it a
          look over and make sure we've got everything right.
        </P>
        <Form onSubmit={this.handleSubmit}>
          <Wrapper>
            <CoverImage alt="Your podcast's cover image" src={feed.cover_art} />
            <FormColumn>
              <Label error={errors && errors.name} text="Podcast name">
                <TextInput
                  autoFocus
                  invalid={Boolean(errors && errors.name)}
                  onChange={this.handleChange('name')}
                  size="large"
                  value={feed.name}
                />
              </Label>
              <Label
                subText="Your slug is used for your podcast's RSS feed and website URL."
                text="Slug"
              >
                <SlugInput
                  onChange={this.handleChange('slug')}
                  onStatusChanged={this.handleSlugStatusChange}
                  provider={this.slugProvider}
                  sourceValue={feed.name}
                  value={feed.slug || ''}
                />
              </Label>
              <Label optional text="Subtitle">
                <TextInput
                  onChange={this.handleChange('subtitle')}
                  value={feed.subtitle}
                />
              </Label>
              <Checkbox
                checked={feed.is_explicit}
                onChange={this.handleChangeExplicit}
                text="Podcast contains explicit content"
              />
              <Label error={errors && errors.description} text="Description">
                <TextArea
                  invalid={Boolean(errors && errors.description)}
                  onChange={this.handleChange('description')}
                  value={feed.description}
                />
              </Label>
              <Label
                error={errors && errors.homepage}
                subText="If you do not have a website, consider using your social media URLs."
                text="Homepage"
              >
                <TextInput
                  invalid={Boolean(errors && errors.homepage)}
                  onChange={this.handleChange('homepage')}
                  type="url"
                  value={feed.homepage}
                />
              </Label>
              <Label error={errors && errors.author_name} text="Author">
                <TextInput
                  invalid={Boolean(errors && errors.author_name)}
                  onChange={this.handleChange('author_name')}
                  value={feed.author_name}
                />
              </Label>
              <Label optional text="Copyright">
                <TextInput
                  onChange={this.handleChange('copyright')}
                  value={feed.copyright}
                />
              </Label>
              <EpisodeStatus
                episodes={feed.items.length}
                ignoredEpisodes={this.props.feed.__ignored_items}
              />
            </FormColumn>
          </Wrapper>
          <SubmitWrapper>
            <Button
              $isPrimary
              disabled={!this.canSubmit()}
              onClick={this.handleSubmit}
              size="large"
            >
              Continue
            </Button>
          </SubmitWrapper>
        </Form>
      </Card>
    );
  }
}
