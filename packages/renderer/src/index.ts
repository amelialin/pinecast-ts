import * as http from 'http';

import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as data from './data';


const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
    const [siteResources, episodeResources] = await Promise.all([
        data.getSite(ctx),
        data.getEpisodes(ctx, ctx.query.page ? Number(ctx.query.page) : 0),
    ]);
    //
});
router.get('blog', async ctx => {
    const [siteResources, postResources] = await Promise.all([
        data.getSite(ctx),
        data.getPosts(ctx, ctx.query.page ? Number(ctx.query.page) : 0),
    ]);
    //
});
router.get('blog/:slug', async ctx => {
    const [siteResources, postResources] = await Promise.all([
        data.getSite(ctx),
        data.getPost(ctx, ctx.params.slug),
    ]);
    //
});
router.get('episode/:id', async ctx => {
    const [siteResources, episodeResources] = await Promise.all([
        data.getSite(ctx),
        data.getEpisode(ctx, ctx.params.id),
    ]);
    //
});
router.get(':slug', async ctx => {
    const resources = await data.getSite(ctx);
    //
});

async function proxy(ctx: Koa.Context) {
    ctx.body = await new Promise((resolve, reject) => {
        http.get(
            {
                hostname: 'pinecast.co',
                method: 'GET',
                path: ctx.request.path,
                headers: {
                    ...ctx.request.header,
                    'X-Pinecast-Forward': ctx.request.header['x-pinecast-forward'] || 'abts.pinecast.co',
                    'Host': 'pinecast.co',
                },
            },
            resp => {
                ctx.response.set('Content-Type', resp.headers['content-type']);
                resolve(resp);
            }
        ).on('error', reject);
    });
}

router.get('/rss/blog', proxy);
router.get('/robots.txt', proxy);
router.get('/sitemap.xml', proxy);
router.get('/favicon.ico', proxy);

app
    .use(router.routes())
    .use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
