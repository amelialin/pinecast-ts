import * as http from 'http';

import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as data from './data';
import {DataAPI} from './jsAPI';
import {NotFoundError} from './errors';
import {routes} from './routes';

const app = new Koa();
const router = new Router();

function mountRoute(name: string) {
  router.get(name, routes[name].path, async ctx => {
    ctx.body = await routes[name].build(
      data as DataAPI,
      ctx.request.header['x-pinecast-forward'],
      ctx.query,
      ctx.params,
    );
  });
}

async function proxy(ctx: Koa.Context) {
  ctx.body = await new Promise((resolve, reject) => {
    http
      .get(
        {
          hostname: 'pinecast.co',
          method: 'GET',
          path: ctx.request.path,
          headers: {
            ...ctx.request.header,
            'X-Pinecast-Forward':
              ctx.request.header['x-pinecast-forward'] || 'abts.pinecast.co',
            Host: 'pinecast.co',
          },
        },
        resp => {
          function set(name: string) {
            if (resp.headers[name.toLowerCase()]) {
              ctx.response.set(name, resp.headers[name] as string);
            }
          }
          set('Content-Type');
          set('Content-Length');
          set('Content-Encoding');
          resolve(resp);
        },
      )
      .on('error', err => {
        console.error(`Error proxying ${ctx.request.originalUrl}`);
        reject(err);
      });
  });
}

app.use(async (ctx, next) => {
  try {
    await next();
    if (!ctx.body) {
      console.error(`No matching routes for ${ctx.originalUrl}`);
      ctx.status = 404;
      ctx.body = '404 Not Found';
    }
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.error(`Got 404 for ${ctx.request.originalUrl}`);
      ctx.status = 404;
      ctx.body = 'Not Found';
      return;
    }
    console.error(e);
    ctx.status = 500;
    ctx.body = '500 Server Error';
  }
});

router.get('/robots.txt', proxy);
router.get('/sitemap.xml', proxy);
router.get('/favicon.ico', proxy);

mountRoute('home');
mountRoute('episode');
mountRoute('page');

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
