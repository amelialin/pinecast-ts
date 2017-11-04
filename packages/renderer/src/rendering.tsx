import * as React from 'react';

import {
  Body,
  ComponentContext,
  ItemSourceContext,
  primitives,
  renderBlock,
  renderElement,
  renderLayout,
} from '@pinecast/sb-components/dist';
import * as presets from '@pinecast/sb-presets';

import ContextProvider from './ContextProvider';
import frame from './framing';
import {route} from './routes';

type URLResolver = (
  route: string,
  params?: {[param: string]: string},
) => string;

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
    hasNextItem: () => yielded + 1 < items.length,
    [Symbol.iterator]: inst[Symbol.iterator].bind(inst),
  };
}

function buildTheme(
  themeObj: {
    $type?: string;
    colors?: {[color: string]: string};
    fonts?: {[font: string]: string};
    styling: {
      buttons?: React.CSSProperties;
    };
    options: {
      embedTheme?: string;
      rootFlexibleHeight?: boolean;
    };
  },
  themeName: string,
) {
  if (!presets.themes.hasOwnProperty(themeObj.$type || themeName)) {
    return themeObj;
  }
  const preset = presets.themes[themeObj.$type || themeName];
  return {
    $type: themeName,
    ...preset,
    ...themeObj,
    colors: {
      ...preset.colors,
      ...themeObj.colors,
    },
    fonts: {
      ...preset.fonts,
      ...themeObj.fonts,
    },
    styling: {
      ...preset.styling,
      ...themeObj.styling,
    },
    options: {
      ...preset.options,
      ...themeObj.options,
    },
  };
}

function getContextFromResources(
  func: (
    context: ComponentContext,
    resources: any,
    ...args: Array<string>
  ) => Promise<string>,
): (data: any, ...args: Array<string>) => Promise<string> {
  return async (data: any, ...args: Array<any>): Promise<string> => {
    const theme = (data.site.site && data.site.site.theme) || {};
    const themeName =
      'clarity' ||
      (theme && theme.$type) ||
      data.site.site.legacy_theme ||
      'panther';
    const context: ComponentContext = {
      ...buildTheme(theme, themeName),
      data: data.site,
      resources: {
        cover_art: data.site.site.cover_image_url,
        logo: data.site.site.logo_url,
      },

      url: route,
      pagination: data.episodes,
    };
    return func(context, data, ...args);
  };
}

export const renderHome = getContextFromResources(async function renderHome(
  context: ComponentContext,
  resources: any,
): Promise<string> {
  context.pagination = resources.episodes;
  return frame(
    render(
      context,
      getItemSource(resources.episodes.items),
      [
        resources.episodes.page === 1
          ? renderLayout(context.layout.body.home.firstPagePrefix)
          : [],
        resources.episodes.page === 1
          ? renderBlock(context.layout.body.home.firstPageAfterPrefix || [])
          : [],
        renderLayout(context.layout.body.home.segments),
      ].filter(x => x),
    ),
    context.data,
    {context},
  );
});
export const renderEpisode = getContextFromResources(
  async function renderEpisode(
    context: ComponentContext,
    resources: any,
  ): Promise<string> {
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
        context,
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
        const hostData = JSON.parse(page.body);
        return renderElement(
          'page.hosts',
          {...page, body: hostData},
          context.layout.body.page.hosts,
        );
      case 'contact':
        const contactData = JSON.parse(page.body);
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
    context,
    title: context.data.pages[slug].title,
  });
});
