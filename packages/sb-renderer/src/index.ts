import {getSite, getEpisode, getEpisodes} from './data';
import {JSONObject} from './jsonType';
import * as rendering from './rendering';
import {match, route as routesRoute, routes as routesRoutes} from './routes';

export default rendering;
export const route = routesRoute;
export const routes = routesRoutes;
export const matchRoute = match;

export type JSONObject = JSONObject;
export interface DataAPI {
  getSite: typeof getSite;
  getEpisode: typeof getEpisode;
  getEpisodes: typeof getEpisodes;
}
