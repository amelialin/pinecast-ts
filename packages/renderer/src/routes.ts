import * as defaultData from './data';
import {NotFoundError} from './errors';
import * as rendering from './rendering';
import {DataAPI} from './jsAPI';


export interface Route {
    path: string,
    format: (params: {[param: string]: string}) => string,
    build: (
        dataProvider: DataAPI,
        siteHostname: string,
        query: {[param: string]: string},
        params: {[param: string]: string},
    ) => Promise<string>,
};

export const routes: {[route: string]: Route} = {
    home: {
        path: '/',
        format: () => '/',
        build: async (data, siteHostname, query, params): Promise<string> =>
            rendering.renderHome(
                await defaultData.awaitAll({
                    site: data.getSite(siteHostname),
                    episodes: data.getEpisodes(siteHostname, query.page ? Number(query.page) : 1),
                })
            ),
    },
    episode: {
        path: '/episode/:id',
        format: ({id}) => `/episode/${encodeURIComponent(id)}`,
        build: async (data, siteHostname, query, params): Promise<string> =>
            rendering.renderEpisode(
                await defaultData.awaitAll({
                    site: data.getSite(siteHostname),
                    episode: data.getEpisode(siteHostname, params.id),
                })
            ),
    },
    page: {
        path: '/:slug',
        format: ({slug}) => `/${encodeURIComponent(slug)}`,
        build: async (data, siteHostname, query, params): Promise<string> => {
            const slug = params.slug;
            const resources = {site: await data.getSite(siteHostname)};

            if (resources.site.pages && (resources.site.pages as {[key: string]: string})[slug]) {
                return rendering.renderPage(resources);
            }
            console.error(`Couldn't resolve route ${slug}`);
            throw new NotFoundError();
        }
    },
};

export function route(name: string, params: {[name: string]: string}): string {
    const route = routes[name];
    if (!route) {
        throw new Error(`Unexpected route '${name}'`);
    }
    return route.format(params);
};
