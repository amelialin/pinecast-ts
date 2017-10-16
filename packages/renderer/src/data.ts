import * as http from 'http';

import * as Koa from 'koa';

import {JSONObject} from './jsonType';
import {NotFoundError} from './errors';

function fetch(siteHostname: string, url: string) {
  const framedURL = url + (url.includes('?') ? '&' : '?') + 'format=json';
  return new Promise((resolve, reject) => {
    http
      .get(
        {
          hostname: 'pinecast.co',
          method: 'GET',
          path: framedURL,
          headers: {
            Host: 'pinecast.co',
            'X-Pinecast-Forward': siteHostname || 'serverboy.net',
            // 'X-Pinecast-Forward': siteHostname || 'abtd.pinecast.co',
          },
        },
        resp => {
          if (resp.statusCode === 404) {
            console.error(`Could not get ${siteHostname}/${framedURL}`);
            reject(new NotFoundError());
            return;
          }
          let data = '';
          resp.on('data', blob => (data += blob.toString()));
          resp.on('end', () => resolve(data));
          resp.on('error', reject);
        },
      )
      .on('error', reject);
  });
}
async function parse(response: string): Promise<JSONObject> {
  try {
    return JSON.parse(response) as JSONObject;
  } catch (e) {
    try {
      console.log(response.substr(0, 100));
    } catch (e) {}
    console.log(e);
    console.warn(response);
    throw e;
  }
}

export async function getSite(siteHostname: string): Promise<JSONObject> {
  return fetch(siteHostname, '/').then(parse) as Promise<JSONObject>;
}
export async function getEpisodes(
  siteHostname: string,
  page: number,
): Promise<JSONObject> {
  return fetch(siteHostname, `/episode?page=${page}`).then(parse) as Promise<
    JSONObject
  >;
}
export async function getEpisode(
  siteHostname: string,
  id: string,
): Promise<JSONObject> {
  return fetch(siteHostname, `/episode/${encodeURIComponent(id)}`).then(
    parse,
  ) as Promise<JSONObject>;
}

export async function awaitAll(promises: {
  [key: string]: Promise<any>;
}): Promise<{[key: string]: any}> {
  const keys = Object.keys(promises);
  return (await Promise.all(
    keys.map(key => promises[key]),
  )).reduce((acc, cur, i) => {
    acc[keys[i]] = cur;
    return acc;
  }, {});
}
