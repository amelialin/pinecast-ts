export interface Route {
    path: string,
    format: (params: {[param: string]: string}) => string,
};

export const routes: {[route: string]: Route} = {
    home: {
        path: '/',
        format: () => '/',
    },
    episode: {
        path: '/episode/:id',
        format: ({id}) => `/episode/${encodeURIComponent(id)}`,
    },
    page: {
        path: '/:slug',
        format: ({slug}) => `/${encodeURIComponent(slug)}`,
    },
};

export function route(name: string, params: {[name: string]: string}): string {
    const route = routes[name];
    if (!route) {
        throw new Error(`Unexpected route '${name}'`);
    }
    return route.format(params);
};
