import * as defaultData from './data';
import {NotFoundError} from './errors';
import * as rendering from './rendering';
import {DataAPI} from './jsAPI';

export type RequestURLParams = {[param: string]: string};
export type RequestQueryParams = {[param: string]: string};

// export interface ReadinessTester {
//     getSite(hostname: string): boolean,
//     getEpisodes(hostname: string, page: number): boolean,
//     getEpisode(hostname: string, id: string): boolean,
// };

export interface Route {
  path: string;
  format: (params: RequestURLParams) => string;
  match: (url: string) => RequestURLParams | null;
  // canBeBuilt: (hostname: string, tester: ReadinessTester, params: RequestURLParams, query: RequestQueryParams) => boolean,
  build: (
    dataProvider: DataAPI,
    siteHostname: string,
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
    // canBeBuilt: (hostname, tester, params, query) => (
    //     tester.getSite(hostname) &&
    //     tester.getEpisodes(hostname, query.page ? Number(query.page) : 1)
    // ),
    build: async (data, siteHostname, query, params): Promise<string> =>
      rendering.renderHome(
        await defaultData.awaitAll({
          site: data.getSite(siteHostname),
          episodes: data.getEpisodes(
            siteHostname,
            query.page ? Number(query.page) : 1,
          ),
        }),
      ),
  },
  episode: {
    path: '/episode/:id',
    format: ({id}) => `/episode/${encodeURIComponent(id)}`,
    match: matcher('/episode/:id'),
    // canBeBuilt: (hostname, tester, params) => (
    //     tester.getSite(hostname) &&
    //     tester.getEpisode(hostname, params.id)
    // ),
    build: async (data, siteHostname, query, params): Promise<string> =>
      rendering.renderEpisode(
        await defaultData.awaitAll({
          site: data.getSite(siteHostname),
          episode: data.getEpisode(siteHostname, params.id),
        }),
      ),
  },
  page: {
    path: '/:slug',
    format: ({slug}) => `/${encodeURIComponent(slug)}`,
    match: matcher('/:slug'),
    // canBeBuilt: (hostname, tester) => tester.getSite(hostname),
    build: async (data, siteHostname, query, params): Promise<string> => {
      const slug = params.slug;
      const resources = {site: await data.getSite(siteHostname)};

      if (
        resources.site.pages &&
        (resources.site.pages as {[key: string]: string})[slug]
      ) {
        return rendering.renderPage(resources);
      }
      console.error(`Couldn't resolve route ${slug}`);
      throw new NotFoundError();
    },
  },
};

export function route(name: string, params: {[name: string]: string}): string {
  const route = routes[name];
  if (!route) {
    throw new Error(`Unexpected route '${name}'`);
  }
  return route.format(params);
}

export function match(url: string): [Route, RequestURLParams] | null {
  for (const [name, route] of Object.entries(routes)) {
    const params = route.match(url);
    if (!params) {
      continue;
    }
    return [route, params];
  }
  return null;
}
