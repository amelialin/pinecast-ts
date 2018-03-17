import * as React from 'react';

import {CSS} from '@pinecast/styles';

import atom from '../../elements/atom';
import {ElementLayout, Link as LinkType, Page} from '../../primitives';
import {ComponentContext, getsContext} from '../../componentContext';
import {MountProvider} from '../mounts';
import renderElements from '../../elements';
import TextRenderer from '../../common/text';

const newWindowProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export default getsContext(
  (
    {
      layout,
      template,
    }: {
      layout: {
        linkStyle: CSS;
        linkHoverStyle: CSS;
        openInNewWindow?: boolean;
      };
      template: ElementLayout;
    },
    {ctx}: {ctx: ComponentContext},
  ) => {
    const linkStyles = {
      ...layout.linkStyle,
      ':hover': layout.linkHoverStyle,
    };
    return (
      <MountProvider
        children={renderElements('mount', ctx.data, template)}
        mounts={{
          siteLinks: ctx.data.links.map(
            (link: LinkType, i: number): JSX.Element => (
              <TextRenderer
                content={link.title}
                data-link="true"
                element="a"
                extends={ctx.textStyles.navigationLinks}
                href={link.url}
                key={`link:${i}`}
                style={linkStyles}
                {...(layout.openInNewWindow ? newWindowProps : {})}
              />
            ),
          ),
          pageLinks: Object.values(ctx.data.pages).map(
            (page: Page): JSX.Element => (
              <TextRenderer
                content={page.title}
                data-link="true"
                element="a"
                extends={ctx.textStyles.navigationLinks}
                href={ctx.url('page', {slug: page.slug})}
                key={`page:${page.slug}`}
                style={linkStyles}
                {...(layout.openInNewWindow ? newWindowProps : {})}
              />
            ),
          ),
          subLinks: [
            ['Apple Podcasts', ctx.data.site.itunes_url],
            ['Google Play', ctx.data.site.google_play_url],
            ['Stitcher', ctx.data.site.stitcher_url],
            ['RSS Feed', `https://pinecast.com/feed/${ctx.data.podcast.slug}`],
          ]
            .filter(x => x[1])
            .map(([name, url]: [string, string]): JSX.Element => (
              <TextRenderer
                content={name}
                data-link="true"
                element="a"
                extends={ctx.textStyles.navigationLinks}
                href={url}
                key={`page:${url}`}
                rel="noopener noreferrer"
                style={linkStyles}
                target="_blank"
              />
            )),
        }}
      />
    );
  },
);
