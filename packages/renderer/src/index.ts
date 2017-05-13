import * as http from 'http';

import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as data from './data';
import frame from './framing';
import {NotFoundError} from './errors';
import * as rendering from './rendering';


const app = new Koa();
const router = new Router();

router.get('home', '/', async ctx => {
    const resources = await data.awaitAll({
        ...ctx.state.resources,
        episodes: data.getEpisodes(ctx, ctx.query.page ? Number(ctx.query.page) : 1),
    });

    ctx.body = await frame(
        rendering.renderHome(resources),
        ctx
    );
});
router.get('blog', '/blog', async ctx => {
    const resources = await data.awaitAll({
        ...ctx.state.resources,
        posts: data.getPosts(ctx, ctx.query.page ? Number(ctx.query.page) : 1),
    });

    ctx.body = await frame(
        rendering.renderBlog(resources),
        ctx
    );
});
router.get('post', '/blog/:slug', async ctx => {
    const resources = await data.awaitAll({
        ...ctx.state.resources,
        post: data.getPost(ctx, ctx.params.slug),
    });

    ctx.body = await frame(
        rendering.renderBlogPost(resources),
        ctx,
        resources.post.title
    );
});
router.get('episode', '/episode/:id', async ctx => {
    const resources = await data.awaitAll({
        ...ctx.state.resources,
        episode: data.getEpisode(ctx, ctx.params.id),
    });

    ctx.body = await frame(
        rendering.renderEpisode(resources),
        ctx,
        resources.episode.title
    );
});
router.get('page', '/:slug', async (ctx, next) => {
    const slug = ctx.params.slug;
    const resources = await data.awaitAll(ctx.state.resources);

    if (!resources.site.pages[slug]) {
        ctx.status = 404;
        return next();
    }

    ctx.body = await frame(
        rendering.renderPage(resources, slug),
        ctx,
        resources.site.pages[slug].title
    );
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


app.use(async (ctx, next) => {
    ctx.state.resources = {
        site: data.getSite(ctx),
    };
    ctx.state.router = router;
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

app.use(router.routes())
    .use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
