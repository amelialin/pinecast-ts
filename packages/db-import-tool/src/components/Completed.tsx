import * as React from 'react';

import Card from '@pinecast/common/Card';
import {CSS} from '@pinecast/styles';
import {DashboardTitle, P} from '@pinecast/common/Text';
import Link from '@pinecast/common/Link';

const cardStyles: CSS = {
  margin: '20px auto 100px',
  maxWidth: 600,
};

// TODO: rawvoice, whooshka, hipcast, zencast, bumpers, acast, omny studio
type Service =
  | 'anchor'
  | 'audioboom'
  | 'blubrry'
  | 'buzzsprout'
  | 'feedburner'
  | 'fireside'
  | 'libsyn'
  | 'pippa'
  | 'podbean'
  | 'podiant'
  | 'podigee'
  | 'podomatic'
  | 'simplecast'
  | 'soundcloud'
  | 'spreaker'
  | 'squarespace'
  | 'other';
const services: {[key: string]: (u: string) => boolean} = {
  anchor: (feed: string) => feed.includes('anchor.fm'),
  audioboom: (feed: string) => feed.includes('audioboom'),
  blubrry: (feed: string) => feed.includes('blubrry'),
  buzzsprout: (feed: string) => feed.includes('buzzsprout'),
  feedburner: (feed: string) => feed.includes('feedburner'),
  fireside: (feed: string) => feed.includes('fireside'),
  libsyn: (feed: string) => feed.includes('.libsyn.com'),
  pippa: (feed: string) => feed.includes('pippa'),
  podbean: (feed: string) => feed.includes('.podbean.com'),
  podiant: (feed: string) => feed.includes('podiant'),
  podigee: (feed: string) => feed.includes('podigee'),
  podomatic: (feed: string) => feed.includes('podomatic'),
  simplecast: (feed: string) => feed.includes('simplecast'),
  soundcloud: (feed: string) => feed.includes('soundcloud'),
  spreaker: (feed: string) => feed.includes('spreaker'),
  squarespace: (feed: string) => feed.includes('squarespace'),
};
function getService(feed: string): Service {
  const entry = (Object.entries(services) as Array<
    [Service, (inp: string) => boolean]
  >).find(x => x[1](feed));
  if (!entry) {
    return 'other';
  }
  return entry[0];
}

const linkProps: {rel: 'noopener noreferrer'; style: CSS; target: '_blank'} = {
  rel: 'noopener noreferrer',
  style: {textDecoration: 'underline'},
  target: '_blank',
};
const serviceLinks: {[key: string]: JSX.Element} = {
  anchor: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-anchorfm"
    >
      Instructions for adding a redirect on <b>Anchor.fm</b>…
    </Link>
  ),
  audioboom: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-audioboom"
    >
      Instructions for adding a redirect on <b>Audioboom</b>…
    </Link>
  ),
  blubrry: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-blubrry-or-powerpress"
    >
      Instructions for adding a redirect on <b>Blubrry</b>…
    </Link>
  ),
  buzzsprout: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-buzzsprout"
    >
      Instructions for adding a redirect on <b>Buzzsprout</b>…
    </Link>
  ),
  feedburner: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-feedburner"
    >
      Instructions for adding a redirect on <b>Feedburner</b>…
    </Link>
  ),
  fireside: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-firesidefm"
    >
      Instructions for adding a redirect on <b>Fireside.fm</b>…
    </Link>
  ),
  libsyn: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-libsyn"
    >
      Instructions for adding a redirect on <b>Libsyn</b>…
    </Link>
  ),
  pippa: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-pippa"
    >
      Instructions for adding a redirect on <b>Pippa</b>…
    </Link>
  ),
  podbean: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-podbean"
    >
      Instructions for adding a redirect on <b>Podbean</b>…
    </Link>
  ),
  podiant: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-podiant"
    >
      Instructions for adding a redirect on <b>Podiant</b>…
    </Link>
  ),
  podigee: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-podigee"
    >
      Instructions for adding a redirect on <b>Podigee</b>…
    </Link>
  ),
  podomatic: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-podomatic"
    >
      Instructions for adding a redirect on <b>PodOmatic</b>…
    </Link>
  ),
  simplecast: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-simplecast"
    >
      Instructions for adding a redirect on <b>Simplecast</b>…
    </Link>
  ),
  soundcloud: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-soundcloud"
    >
      Instructions for adding a redirect on <b>SoundCloud</b>…
    </Link>
  ),
  spreaker: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-spreaker"
    >
      Instructions for adding a redirect on <b>Spreaker</b>…
    </Link>
  ),
  squarespace: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-from-squarespace"
    >
      Instructions for adding a redirect on <b>Squarespace</b>…
    </Link>
  ),
  other: (
    <Link
      {...linkProps}
      href="http://help.pinecast.com/how-to/setting-up-a-feed-redirect/setting-up-a-feed-redirect-for-any-service"
    >
      Get instructions for setting up a redirect…
    </Link>
  ),
};

export default class Completed extends React.PureComponent {
  props: {feedURL: string};

  render() {
    return (
      <Card style={cardStyles} whiteBack>
        <DashboardTitle>That's it.</DashboardTitle>
        <P>
          <b>There is only one final step:</b> setting up a feed redirect.
        </P>
        <P>{serviceLinks[getService(this.props.feedURL)]}</P>
        <P>
          Setting up a feed redirect will move your existing subscribers and
          directory listings (like Apple Podcasts, Google Play, etc.) to
          Pinecast automatically; no extra work needed. If you need assistance
          setting up a feed redirect, please get in touch. We're happy to help.
        </P>
      </Card>
    );
  }
}
