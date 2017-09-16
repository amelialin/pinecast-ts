import {JSONObject} from './jsonType';
import * as rendering from './rendering';
import {route as routesRoute, routes as routesRoutes} from './routes';

export default rendering;
export const route = routesRoute;
export const routes = routesRoutes;

export interface DataAPI {
    getSite(hostname: string): Promise<JSONObject>,
    getEpisodes(hostname: string, page: number): Promise<JSONObject>,
    getEpisode(hostname: string, id: string): Promise<JSONObject>,
};
