import {
  DataAPI,
  /*DataReadinessAPI, */ JSONObject,
} from '@pinecast/sb-renderer';

import request from './requests';
import {ReducerType} from '../reducer';

async function parse(data: string): JSONObject {
  return JSON.parse(data) as JSONObject;
}

export const fetcher: ((theme: Object) => DataAPI) = (theme: Object) => ({
  getSite(hostname: string): Promise<JSONObject> {
    return request(
      `https://pinecast.com/sites/site_builder/${encodeURIComponent(hostname)}`,
    )
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
      `https://pinecast.com/sites/site_builder/${encodeURIComponent(
        hostname,
      )}/episode?page=${page}`,
    ).then(parse);
  },
  getEpisode(hostname: string, id: string) {
    return request(
      `https://pinecast.com/sites/site_builder/${encodeURIComponent(
        hostname,
      )}/episode/${encodeURIComponent(id)}`,
    ).then(parse);
  },
});

// export const hasData = (state: ReducerType): DataReadinessAPI => ({
//     getSite: (): boolean => Boolean(state.preview.data.site),
//     getEpisodes: (page: number): boolean => Boolean(state.preview.data.episodes[page]),
//     getEpisode: (id: string): boolean => Boolean(state.preview.data.episode[id]),
// });
