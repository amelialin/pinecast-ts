import {JSONObject} from './jsonType';
import * as rendering from './rendering';
import {match, route as routesRoute, routes as routesRoutes} from './routes';

export default rendering;
export const route = routesRoute;
export const routes = routesRoutes;
export const matchRoute = match;

export type JSONObject = JSONObject;
export interface DataAPI {
    getSite(hostname: string): Promise<JSONObject>,
    getEpisodes(hostname: string, page: number): Promise<JSONObject>,
    getEpisode(hostname: string, id: string): Promise<JSONObject>,
};

// export interface DataReadinessAPI {
//     getSite(): boolean,
//     getEpisodes(page: number): boolean,
//     getEpisode(id: string): boolean,
// };
