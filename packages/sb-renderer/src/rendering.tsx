import * as React from 'react';

import {
  Body,
  ComponentContext,
  ItemSourceContext,
  primitives,
  renderBlock,
  renderElement,
  renderLayout,
} from '@pinecast/sb-components';
import escapeHTML from '@pinecast/common/helpers/escapeHTML';
import {PLAYER_HEIGHTS} from '@pinecast/sb-components/src/elements/EmbedPlayer';
import * as presets from '@pinecast/sb-presets';

import ContextProvider from './ContextProvider';
import frame from './framing';
import {route} from './routes';

function render(
  data: ComponentContext,
  itemSource: ItemSourceContext<any> | null = null,
  children?: any | null,
): JSX.Element {
  return (
    <ContextProvider ctx={data} itemSource={itemSource}>
      <Body children={children} />
    </ContextProvider>
  );
}

function getItemSource<T>(items: Array<T>): ItemSourceContext<T> {
  let yielded = 0;
  function* yielder(): Iterator<T> {
    for (; yielded < items.length; yielded += 1) {
      yield items[yielded];
    }
  }
  const inst = yielder();
  return {
    getItem: inst.next.bind(inst),
    hasNextItem: () => yielded < items.length,
    [Symbol.iterator]: (inst as any)[Symbol.iterator].bind(inst),
  };
}

const themeCache = new WeakMap();

function buildTheme(
  themeObj: {
    $type?: string;
  },
  themeName: string,
) {
  if (themeCache.has(themeObj)) {
    return themeCache.get(themeObj);
  }
  if (!presets.themes.hasOwnProperty(themeObj.$type || themeName)) {
    return themeObj;
  }
  const preset = (presets.themes as {[theme: string]: unknown})[
    themeObj.$type || themeName
  ];

  const out = presets.merge(
    {
      options: {},
      styling: {},
      ...preset,
      $type: themeName,
    },
    themeObj,
  );
  themeCache.set(themeObj, out);
  return out;
}

export function getThemeFromSite(site: any) {
  const theme = (site.site && site.site.theme) || {};
  const themeName =
    (theme && theme.$type) || site.site.legacy_theme || 'clarity';
  return buildTheme(theme, themeName);
}

function getContextFromResources(
  func: (
    context: ComponentContext,
    resources: any,
    ...args: Array<string | number>
  ) => Promise<string>,
): (data: any, ...args: Array<string | number>) => Promise<string> {
  return async (data: any, ...args: Array<any>): Promise<string> => {
    const context: ComponentContext = {
      ...getThemeFromSite(data.site),
      data: data.site,
      resources: {
        cover_art: data.site.site.cover_image_url,
        logo: data.site.site.logo_url,
      },

      url: route,
    };
    return func(context, data, ...args);
  };
}

export const renderHome = getContextFromResources(async function renderHome(
  context: ComponentContext,
  resources: any,
  page: number,
): Promise<string> {
  context.pagination = {page, ...resources.episodes};
  return frame(
    render(
      context,
      getItemSource(resources.episodes.items),
      [
        resources.episodes.offset === 0
          ? renderLayout(context.layout.body.home.firstPagePrefix)
          : [],
        resources.episodes.offset === 0
          ? renderBlock(context.layout.body.home.firstPageAfterPrefix || [])
          : [],
        renderLayout(context.layout.body.home.segments),
      ].filter(x => x),
    ),
    context.data,
    {
      urlPath: resources.episodes.page === 1 ? '/' : `/?page=${page}`,
      context,
      title: resources.site.podcast.name,
      headExtra: `
        <meta property="og:type" content="website">
        <meta property="og:description" content="${escapeHTML(
          resources.site.podcast.description,
        )}">
        <meta property="og:image" content="${escapeHTML(
          resources.site.podcast.cover_image,
        )}">
        <meta name="twitter:description" content="${escapeHTML(
          resources.site.podcast.description,
        )}">
        <meta name="twitter:image" content="${escapeHTML(
          resources.site.podcast.cover_image,
        )}">
        `,
    },
  );
});
export const renderEpisode = getContextFromResources(
  async function renderEpisode(
    context: ComponentContext,
    resources: any,
  ): Promise<string> {
    const embedTheme = context.options.embedTheme || 'minimal';
    const embedHeight = PLAYER_HEIGHTS[embedTheme];
    return frame(
      render(
        context,
        null,
        renderElement(
          'episode',
          resources.episode,
          context.layout.body.episode,
        ),
      ),
      context.data,
      {
        urlPath: `/episode/${resources.episode.id}`,
        context,
        headExtra: `
        <meta property="og:type" content="article">
        <meta property="og:description" content="${escapeHTML(
          resources.episode.subtitle || resources.episode.description_raw,
        )}">
        <meta property="og:image" content="${escapeHTML(
          resources.episode.image_url,
        )}">
        <meta property="article:published_time" content="${escapeHTML(
          resources.episode.publish,
        )}">
        <link rel="alternate" type="application/json+oembed"
          href="https://pinecast.com/services/oembed.json?url=${encodeURIComponent(
            `https://pinecast.com/listen/${resources.episode.id}`,
          )}"
          title="Pinecast oEmbed Profile">
        <meta name="twitter:card" content="player">
        <meta name="twitter:description" content="${escapeHTML(
          resources.episode.subtitle || resources.episode.description_raw,
        )}">
        <meta name="twitter:image" content="${escapeHTML(
          resources.episode.image_url,
        )}">
        <meta name="twitter:player" content="${escapeHTML(
          resources.episode.player_url,
        )}?theme=${embedTheme}&card=true">
        <meta name="twitter:player:width" content="480">
        <meta name="twitter:player:height" content="${embedHeight}">
        <meta name="twitter:player:stream" content="https://pinecast.com/listen/${
          resources.episode.id
        }">
        <meta name="twitter:player:stream:content_type" content="${escapeHTML(
          resources.episode.audio_type,
        )}">
        `,
        title: resources.episode.title,
      },
    );
  },
);
export const renderPage = getContextFromResources(async function renderPage(
  context: ComponentContext,
  resources: any,
  slug: string,
): Promise<string> {
  function renderBody(): JSX.Element {
    const page: primitives.Page = context.data.pages[slug];
    if (!page) {
      throw new Error(`Unknown page slug '${slug}'`);
    }
    switch (page.page_type) {
      case 'markdown':
        return renderElement(
          'page.markdown',
          page,
          context.layout.body.page.markdown,
        );
      case 'hosts':
        const hostData = page.body;
        return renderElement(
          'page.hosts',
          {...page, body: hostData},
          context.layout.body.page.hosts,
        );
      case 'contact':
        const contactData = page.body;
        return renderElement(
          'page.contact',
          {...page, body: contactData},
          context.layout.body.page.contact,
        );
      default:
        throw new Error(`Unknown page type '${page.page_type}'`);
    }
  }
  return frame(render(context, null, renderBody()), context.data, {
    urlPath: `/${slug}`,
    context,
    title: context.data.pages[slug].title,
    headExtra: `
      <meta property="og:type" content="article">
    `,
  });
});
