import * as http from 'http';

import * as Koa from 'koa';

import {NotFoundError} from './errors';


function fetch(ctx: Koa.Context, url: string) {
    const framedURL = url + (url.includes('?') ? '&' : '?') + 'format=json';
    return new Promise((resolve, reject) => {
        http.get(
            {
                hostname: 'pinecast.co',
                method: 'GET',
                path: framedURL,
                headers: {
                    ...ctx.request.header,
                    'Host': 'pinecast.co',
                    'X-Pinecast-Forward': ctx.request.header['x-pinecast-forward'] || 'abts.pinecast.co',
                },
            },
            resp => {
                if (resp.statusCode === 404) {
                    reject(new NotFoundError());
                    return;
                }
                let data = '';
                resp.on('data', blob => data += blob.toString());
                resp.on('end', () => resolve(data));
                resp.on('error', reject);
            }
        ).on('error', reject);
    });
}
async function parse(response: string) {
    try {
        return JSON.parse(response);
    } catch (e) {
        console.log(e);
        console.warn(response);
        throw e;
    }
}


export async function getSite(ctx: Koa.Context) {
    return fetch(ctx, '/').then(parse);
};
export async function getEpisodes(ctx: Koa.Context, page: number) {
    return fetch(ctx, `/episode?page=${page}`).then(parse);
};
export async function getEpisode(ctx: Koa.Context, id: string) {
    return fetch(ctx, `/episode/${encodeURIComponent(id)}`).then(parse);
};


export async function awaitAll(promises: {[key: string]: Promise<any>}): Promise<{[key: string]: any}> {
    const keys = Object.keys(promises);
    return (await Promise.all(keys.map(key => promises[key]))).reduce((acc, cur, i) => {
        acc[keys[i]] = cur;
        return acc;
    }, {});
};
