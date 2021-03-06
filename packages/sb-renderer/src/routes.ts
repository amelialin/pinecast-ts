import {primitives} from '@pinecast/sb-components';

import * as defaultData from './data';
import {NotFoundError, RedirectException} from './errors';
import * as rendering from './rendering';
import {DataAPI} from './index';

export type RequestURLParams = {[param: string]: string};
export type RequestQueryParams = {[param: string]: string};

export interface Route {
  path: string;
  format: (params: RequestURLParams) => string;
  match: (url: string) => RequestURLParams | null;
  build: (
    dataProvider: DataAPI,
    req: defaultData.APIRequest,
    query: RequestQueryParams,
    params: RequestURLParams,
  ) => Promise<string>;
}

function matcher(
  regexSource: string,
): (url: string) => RequestURLParams | null {
  const params: Array<string> = [];
  let i = 0;
  while (true) {
    const x = /:(\w+)/.exec(regexSource.slice(i));
    if (!x) {
      break;
    }
    i += x.index + x[1].length + 1;
    params.push(x[1]);
  }
  const regex = new RegExp(
    '^' +
      params.reduce(
        (acc, cur) => acc.replace(`:${cur}`, '([\\w\\-]+)'),
        regexSource,
      ) +
      '$',
  );
  return url => {
    const output = regex.exec(url);
    if (!output) {
      return null;
    }
    return params.reduce(
      (acc: RequestURLParams | null, cur: string, i: number) => {
        if (!acc || !output[i + 1]) {
          return null;
        }
        acc[cur] = output[i + 1];
        return acc;
      },
      {} as RequestURLParams,
    );
  };
}

export const routes: {[route: string]: Route} = {
  home: {
    path: '/',
    format: () => '/',
    match: matcher('/'),
    build: async (data, req, query, params): Promise<string> => {
      const site = await data.getSite(req);
      const page = query.page ? Number(query.page) : 1;

      const theme = rendering.getThemeFromSite(site);
      const defaultConsumeCount: number = theme.options.defaultConsumeCount;
      const themeLayout: primitives.PageLayout = theme.layout;
      const normalize = (x: number) => (x === -1 ? defaultConsumeCount : x);
      const normalPageCount = themeLayout.body.home.segments.reduce(
        (acc, cur) => acc + normalize(cur.consumeCount),
        0,
      );
      const firstPageExtraCount = themeLayout.body.home.firstPagePrefix.reduce(
        (acc, cur) => acc + normalize(cur.consumeCount),
        0,
      );

      const episodes = await data.getEpisodes(
        req,
        // offset
        page === 1 ? 0 : firstPageExtraCount + (page - 1) * normalPageCount,
        page === 1 ? firstPageExtraCount + normalPageCount : normalPageCount,
      );
      return rendering.renderHome({site, episodes}, page);
    },
  },
  episodeLegacy: {
    path: '/episode/:id',
    format: ({id}) => `/episode/${encodeURIComponent(id)}`,
    match: matcher('/episode/:id'),
    build: async (data, req, query, params): Promise<string> => {
      const ep = await data.getEpisode(req, params.id);
      throw new RedirectException((ep as {site_url: string}).site_url, 301);
    },
  },
  episode: {
    path: '/episode/:siteId/:titleSlug',
    // TODO: Can this be made more direct?
    format: ({id}) => `/episode/${encodeURIComponent(id)}`,
    match: matcher('/episode/:siteId/:titleSlug'),
    build: async (data, req, query, params): Promise<string> => {
      const d = await defaultData.awaitAll({
        site: data.getSite(req),
        episode: data.getEpisode(req, params.siteId),
      });
      if (
        d.episode.site_url != `/episode/${params.siteId}/${params.titleSlug}`
      ) {
        throw new RedirectException((d.episode as any).site_url, 301);
      }
      return rendering.renderEpisode(d);
    },
  },
  page: {
    path: '/:slug',
    format: ({slug}) => `/${encodeURIComponent(slug)}`,
    match: matcher('/:slug'),
    build: async (data, req, query, params): Promise<string> => {
      const slug = params.slug;
      const resources = {site: await data.getSite(req)};

      if (
        resources.site.pages &&
        (resources.site.pages as {[key: string]: string})[slug]
      ) {
        return rendering.renderPage(resources, slug);
      }
      console.error(`Couldn't resolve route ${slug}`);
      throw new NotFoundError();
    },
  },
};

export function route(name: string, params: {[name: string]: string}): string {
  const route = routes[name];
  if (!route) {
    throw new Error(
      `Unexpected route '${name}' with params ${JSON.stringify(params)}`,
    );
  }
  return route.format(params);
}

export function match(url: string): [Route, RequestURLParams] | null {
  const noQueryURL = url.includes('?') ? url.substr(0, url.indexOf('?')) : url;
  for (const [, route] of Object.entries(routes)) {
    const params = route.match(noQueryURL);
    if (!params) {
      continue;
    }
    return [route, params];
  }
  return null;
}
