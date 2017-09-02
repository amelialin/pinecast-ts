import * as http from 'http';

import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as data from './data';
import {NotFoundError} from './errors';
import * as rendering from './rendering';
import {routes} from './routes';


const app = new Koa();
const router = new Router();


function mountRoute(name: string, handler: (ctx: Koa.Context, next: () => Promise<any>) => Promise<void>) {
    router.get(name, routes[name].path, handler)
}

mountRoute('home', async ctx => {
    const resources = await data.awaitAll({
        site: data.getSite(ctx),
        episodes: data.getEpisodes(ctx, ctx.query.page ? Number(ctx.query.page) : 1),
    });

    ctx.body = await rendering.renderHome(resources);
});
mountRoute('episode', async ctx => {
    const resources = await data.awaitAll({
        site: data.getSite(ctx),
        episode: data.getEpisode(ctx, ctx.params.id),
    });

    ctx.body = await rendering.renderEpisode(resources);
});
mountRoute('page', async (ctx, next) => {
    const slug = ctx.params.slug;
    const resources = {site: await data.getSite(ctx)};

    if (!resources.site.pages[slug]) {
        ctx.status = 404;
        return next();
    }

    ctx.body = await rendering.renderPage(resources, slug);
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
                if (resp.headers['content-type']) {
                    ctx.response.set('Content-Type', resp.headers['content-type'] as string);
                }
                resolve(resp);
            }
        ).on('error', reject);
    });
}

router.get('/robots.txt', proxy);
router.get('/sitemap.xml', proxy);
router.get('/favicon.ico', proxy);


app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        if (e instanceof NotFoundError) {
            ctx.status = 404;
            ctx.body = 'Not Found';
            return;
        }
        console.log(e);
        ctx.status = 500;
        ctx.body = '500 Server Error';
    }
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
