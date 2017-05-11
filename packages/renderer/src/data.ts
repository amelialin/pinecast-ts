import * as http from 'http';

import * as Koa from 'koa';


function fetch(ctx: Koa.Context, url: string) {
    return new Promise((resolve, reject) => {
        http.get(
            {
                hostname: 'pinecast.co',
                method: 'GET',
                path: url,
                headers: {
                    ...ctx.request.header,
                    'X-Pinecast-Forward': ctx.request.header['x-pinecast-forward'] || 'abts.pinecast.co',
                    'Host': 'pinecast.co',
                },
            },
            resp => {
                let data = '';
                resp.on('data', blob => data += blob.toString());
                resp.on('end', () => resolve(data));
                resp.on('error', reject);
            }
        ).on('error', reject);
    });
}
async function parse(response: string) {
    return JSON.parse(response);
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
export async function getPosts(ctx: Koa.Context, page: number) {
    return fetch(ctx, `/blog?page=${page}`).then(parse);
};
export async function getPost(ctx: Koa.Context, slug: string) {
    return fetch(ctx, `/blog/${encodeURIComponent(slug)}`).then(parse);
};
