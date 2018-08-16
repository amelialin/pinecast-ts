import {DataAPI, JSONObject} from '@pinecast/sb-renderer';
import {url} from '@pinecast/common/helpers';

import request from './requests';

async function parse(data: string): Promise<JSONObject> {
  return JSON.parse(data) as JSONObject;
}

export const fetcher: ((theme: Object) => DataAPI) = (theme: Object) => ({
  getSite(hostname: string): Promise<JSONObject> {
    return request(url`/sites/site_builder/data/${hostname}`)
      .then(parse)
      .then((siteData: any) => ({
        ...siteData,
        site: {
          ...(siteData.site as Object),
          theme,
        },
      }));
  },
  getEpisodes(hostname: string, offset: number, count: number) {
    return request(
      url`/sites/site_builder/data/${hostname}/episode?offset=${offset}&count=${count}`,
    ).then(parse);
  },
  getEpisode(hostname: string, id: string) {
    return request(`/sites/site_builder/data/${hostname}/episode/${id}`).then(
      parse,
    );
  },
});
