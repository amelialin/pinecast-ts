import {DataAPI, JSONObject} from '@pinecast/sb-renderer';

import request from './requests';
import {ReducerType} from '../reducer';

async function parse(data: string): JSONObject {
  return JSON.parse(data) as JSONObject;
}

export const fetcher: ((theme: Object) => DataAPI) = (theme: Object) => ({
  getSite(hostname: string): Promise<JSONObject> {
    return request(`/sites/site_builder/data/${encodeURIComponent(hostname)}`)
      .then(parse)
      .then(siteData => ({
        ...siteData,
        site: {
          ...siteData.site,
          theme,
        },
      }));
  },
  getEpisodes(hostname: string, page: number) {
    return request(
      `/sites/site_builder/data/${encodeURIComponent(
        hostname,
      )}/episode?page=${page}`,
    ).then(parse);
  },
  getEpisode(hostname: string, id: string) {
    return request(
      `/sites/site_builder/data/${encodeURIComponent(
        hostname,
      )}/episode/${encodeURIComponent(id)}`,
    ).then(parse);
  },
});
