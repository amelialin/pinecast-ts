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
              style={marginStyles}
            >
              Apple Podcasts
            </ButtonRenderer>
          ),
          ctx.data.site.google_play_url && (
            <ButtonRenderer
              href={ctx.data.site.google_play_url}
              key="google"
              style={marginStyles}
            >
              Google Play
            </ButtonRenderer>
          ),
          ctx.data.site.stitcher_url && (
            <ButtonRenderer
              href={ctx.data.site.stitcher_url}
              key="stitcher"
              style={marginStyles}
            >
              Stitcher
            </ButtonRenderer>
          ),
          <ButtonRenderer
            href={`https://pinecast.com/feed/${encodeURIComponent(
              ctx.data.podcast.slug,
            )}`}
            key="rss"
            style={marginStyles}
          >
            RSS
          </ButtonRenderer>,
        ].filter(x => x),
      }}
    />
  ),
);
