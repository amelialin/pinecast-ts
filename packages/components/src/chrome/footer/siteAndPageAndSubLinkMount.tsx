import * as React from 'react';

import {CSS} from '@pinecast/sb-styles';

import atom from '../../elements/atom';
import {
  ElementLayout,
  Link as LinkType,
  Page,
  TextStyle,
} from '../../primitives';
import {ComponentContext, getsContext} from '../../componentContext';
import {MountProvider} from '../mounts';
import renderElements from '../../elements';
import TextRenderer from '../../common/text';

export default getsContext(
  (
    {
      layout,
      template,
    }: {
      layout: {
        linkStyle: CSS;
        linkHoverStyle: CSS;
        textStyle?: TextStyle;
      };
      template: ElementLayout;
    },
    {ctx}: {ctx: ComponentContext},
  ) => {
    const Link = atom('a');
    const linkStyles = {
      color: layout.textStyle && layout.textStyle.color,
      ...layout.linkStyle,
      ':hover': layout.linkHoverStyle,
    };
    return (
      <MountProvider
        children={renderElements('mount', ctx.data, template)}
        mounts={{
          siteLinks: ctx.data.links.map(
            (link: LinkType, i: number): JSX.Element => (
              <Link
                data-link="true"
                href={link.url}
                key={`link:${i}`}
                linkHoverStyle={layout.linkHoverStyle}
                linkStyle={layout.linkStyle}
                style={linkStyles}
              >
                <TextRenderer
                  color={linkStyles.color}
                  {...layout.textStyle}
                  content={link.title}
                />
              </Link>
            ),
          ),
          pageLinks: Object.values(
            ctx.data.pages,
          ).map((page: Page): JSX.Element => (
            <Link
              data-link="true"
              href={ctx.url('page', {slug: page.slug})}
              key={`page:${page.slug}`}
              linkHoverStyle={layout.linkHoverStyle}
              linkStyle={layout.linkStyle}
              style={linkStyles}
            >
              <TextRenderer
                color={linkStyles.color}
                {...layout.textStyle}
                content={page.title}
              />
            </Link>
          )),
          subLinks: [
            ['Apple Podcasts', ctx.data.site.itunes_url],
            ['Google Play', ctx.data.site.google_play_url],
            ['Stitcher', ctx.data.site.stitcher_url],
            ['RSS Feed', `https://pinecast.com/feed/${ctx.data.podcast.slug}`],
          ]
            .filter(x => x[1])
            .map(([name, url]: [string, string]): JSX.Element => (
              <Link
                data-link="true"
                href={url}
                key={`page:${url}`}
                linkHoverStyle={layout.linkHoverStyle}
                linkStyle={layout.linkStyle}
                rel="noopener noreferrer"
                style={linkStyles}
                target="_blank"
              >
                <TextRenderer
                  color={linkStyles.color}
                  {...layout.textStyle}
                  content={name}
                />
              </Link>
            )),
        }}
      />
    );
  },
);
