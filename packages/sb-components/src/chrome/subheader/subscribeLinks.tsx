import * as React from 'react';

import {ElementLayout} from '../../primitives';
import ButtonRenderer from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
import {MountProvider} from '../mounts';
import renderElements from '../../elements';

const marginStyles = {
  marginLeft: '0.5em',

  '@mobile': {
    marginLeft: 0,
    marginTop: '0.5em',
  },
};

export default getsContext(
  ({template}: {template: ElementLayout}, {ctx}: {ctx: ComponentContext}) => (
    <MountProvider
      children={renderElements('mount', ctx.data, template)}
      mounts={{
        links: [
          ctx.data.site.itunes_url && (
            <ButtonRenderer
              href={ctx.data.site.itunes_url}
              key="apple"
              rel="noopener noreferrer"
              style={marginStyles}
              target="_blank"
            >
              Apple Podcasts
            </ButtonRenderer>
          ),
          ctx.data.site.google_play_url && (
            <ButtonRenderer
              href={ctx.data.site.google_play_url}
              key="google"
              rel="noopener noreferrer"
              style={marginStyles}
              target="_blank"
            >
              Google Play
            </ButtonRenderer>
          ),
          ctx.data.site.stitcher_url && (
            <ButtonRenderer
              href={ctx.data.site.stitcher_url}
              key="stitcher"
              rel="noopener noreferrer"
              style={marginStyles}
              target="_blank"
            >
              Stitcher
            </ButtonRenderer>
          ),
          ctx.data.site.spotify_url && (
            <ButtonRenderer
              href={ctx.data.site.spotify_url}
              key="spotify"
              rel="noopener noreferrer"
              style={marginStyles}
              target="_blank"
            >
              Spotify
            </ButtonRenderer>
          ),
          <ButtonRenderer
            href={`https://pinecast.com/feed/${encodeURIComponent(
              ctx.data.podcast.slug,
            )}`}
            key="rss"
            rel="noopener noreferrer"
            style={marginStyles}
            target="_blank"
          >
            RSS
          </ButtonRenderer>,
        ].filter(x => x),
      }}
    />
  ),
);
