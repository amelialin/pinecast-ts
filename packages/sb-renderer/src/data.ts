import * as http from 'http';

import {JSONObject} from './jsonType';
import {NotFoundError, RedirectException} from './errors';

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
            // 'X-Pinecast-Forward': siteHostname || 'serverboy.net',
            'X-Pinecast-Forward': siteHostname || 'abtd.pinecast.co',
          },
        },
        resp => {
          if (
            typeof resp.statusCode === 'number' &&
            resp.statusCode >= 300 &&
            resp.statusCode < 400
          ) {
            console.warn(`Redirected to ${resp.headers.location}`);
            reject(new RedirectException(resp.headers.location));
          }
          if (resp.statusCode !== 200) {
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
    console.error(`Error parsing JSON response: ${e}`);
    try {
      console.log(response.substr(0, 100));
    } catch (e) {}
    console.warn(response);
    throw e;
  }
}

export async function getSite(siteHostname: string): Promise<JSONObject> {
  return fetch(siteHostname, '/').then(parse) as Promise<JSONObject>;
}
export async function getEpisodes(
  siteHostname: string,
  offset: number,
  count: number,
): Promise<JSONObject> {
  return fetch(siteHostname, `/episode?offset=${offset}&count=${count}`).then(
    parse,
  ) as Promise<JSONObject>;
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
  return (await Promise.all(keys.map(key => promises[key]))).reduce(
    (acc, cur, i) => {
      acc[keys[i]] = cur;
      return acc;
    },
    {},
  );
}
