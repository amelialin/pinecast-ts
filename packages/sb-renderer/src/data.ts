import * as http from 'http';

import {
  AuthRequiredException,
  NotFoundError,
  RedirectException,
} from './errors';
import {JSONObject} from './jsonType';

export interface APIRequest {
  siteHostname: string;
  headerPAuth?: string;
  headerPUID?: string;
  password?: string;
}

function fetch(req: APIRequest, url: string) {
  return new Promise((resolve, reject) => {
    const xForward = req.siteHostname || 'abts.pinecast.co';
    const headers = {
      Host: 'pinecast.co',
      Authorization: req.password
        ? `Basic ${Buffer.from(`:${req.password}`).toString('base64')}`
        : undefined,
      'X-Pinecast-PAuth': req.headerPAuth,
      'X-Pinecast-PUID': req.headerPUID,
      'X-Pinecast-Forward': xForward,
    };
    Object.keys(headers).forEach((key: keyof typeof headers) => {
      if (!headers[key]) {
        delete headers[key];
      }
    });
    const request = http
      .request(
        {
          // hostname: 'pinecast.co',
          hostname: 'localhost',
          port: 8000,
          method: req.password ? 'POST' : 'GET',
          path: url,
          headers,
        },
        resp => {
          if (
            typeof resp.statusCode === 'number' &&
            resp.statusCode >= 300 &&
            resp.statusCode < 400
          ) {
            console.warn(`Redirected to ${resp.headers.location}`);
            reject(new RedirectException(resp.headers.location || ''));
          }
          if (resp.statusCode === 401) {
            console.log(`Auth required for ${xForward}`);
            reject(new AuthRequiredException());
            return;
          }
          if (resp.statusCode !== 200) {
            console.error(`Could not get ${xForward}${url}`);
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
    request.end();
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

export const getAuth = async (req: APIRequest) =>
  fetch(req, '/.well-known/pinecast/site-auth').then(parse);

export const getSite = async (req: APIRequest) => fetch(req, '/').then(parse);

export const getEpisodes = async (
  req: APIRequest,
  offset: number,
  count: number,
) => fetch(req, `/episode?offset=${offset}&count=${count}`).then(parse);

export const getEpisode = async (req: APIRequest, id: string) =>
  fetch(req, `/episode/${encodeURIComponent(id)}`).then(parse);

export async function awaitAll<T = {[key: string]: any}>(
  promises: {[P in keyof T]: Promise<T[P]>},
): Promise<T> {
  const keys = Object.keys(promises) as Array<keyof T>;
  return (await Promise.all(keys.map(key => promises[key]))).reduce(
    (acc, cur, i) => {
      acc[keys[i]] = cur;
      return acc;
    },
    {} as Partial<T>,
  ) as T;
}
