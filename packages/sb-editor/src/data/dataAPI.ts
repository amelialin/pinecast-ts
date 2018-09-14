import {DataAPI, JSONObject} from '@pinecast/sb-renderer';
import {url} from '@pinecast/common/helpers';

import request from './requests';

async function parse(data: string): Promise<JSONObject> {
  return JSON.parse(data) as JSONObject;
}

export const fetcher: ((theme: Object) => DataAPI) = (
  theme: Object,
): DataAPI => ({
  getSite(req): Promise<JSONObject> {
    return request(url`/sites/site_builder/data/${req.siteHostname}`)
      .then(parse)
      .then((siteData: any) => ({
        ...siteData,
        site: {
          ...(siteData.site as Object),
          theme,
        },
      }));
  },
  getEpisodes(req, offset, count) {
    return request(
      url`/sites/site_builder/data/${
        req.siteHostname
      }/episode?offset=${offset}&count=${count}`,
    ).then(parse);
  },
  getEpisode(req, id) {
    return request(
      `/sites/site_builder/data/${req.siteHostname}/episode/${id}`,
    ).then(parse);
  },
});
