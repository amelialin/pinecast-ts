import * as http from 'http';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyparser from 'koa-bodyparser';

import {
  AuthRequiredException,
  NotFoundError,
  RedirectException,
} from './errors';
import * as data from './data';
import {DataAPI} from './index';
import * as passwordPage from './passwordPage';
import {routes} from './routes';

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 3002;

app.use(bodyparser());

function getAPIRequest(ctx: Koa.Context): data.APIRequest {
  const req: data.APIRequest = {
    siteHostname: ctx.request.header['x-pinecast-forward'],
  };

  req.headerPAuth = ctx.cookies.get('pauth') || undefined;
  req.headerPUID = ctx.cookies.get('puid') || undefined;

  return req;
}

function mountRoute(name: string) {
  router.get(name, routes[name].path, async ctx => {
    ctx.body = await routes[name].build(
      data as DataAPI,
      getAPIRequest(ctx),
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
              ctx.request.header['x-pinecast-forward'] || 'abtd.pinecast.co',
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

// Middleware to redirect podcasts
app.use(async (ctx, next) => {
  const host = ctx.request.header['x-pinecast-forward'];
  if (!host) {
    return next();
  }
  if (host.split('.').length !== 3 || !host.endsWith('.pinecast.co')) {
    return next();
  }
  if (ctx.request.header['x-secure'] === 'false') {
    ctx.status = 301;
    ctx.set('Location', `https://${host}${ctx.originalUrl}`);
    ctx.set('Strict-Transport-Security', 'max-age=3600');
    return;
  } else if (ctx.request.header['x-secure'] === 'true') {
    ctx.set('Strict-Transport-Security', 'max-age=3600');
  }
  return next();
});

// Middleware to handle password-protected podcasts
app.use(async (ctx, next) => {
  const body = ctx.request.body as {[key: string]: string};
  if (ctx.method === 'POST' && body.__auth_password) {
    const password = body.__auth_password;
    try {
      const resp = await data.getAuth({
        ...getAPIRequest(ctx),
        password,
      });
      const cookieOptions = {
        domain:
          ctx.request.header['x-pinecast-forward'] || ctx.request.hostname,
      };
      ctx.cookies.set('pauth', resp.auth as string, cookieOptions);
      ctx.cookies.set('puid', resp.uid as string, cookieOptions);
      ctx.status = 302;
      ctx.set('Location', ctx.url);
      return;
    } catch (e) {
      ctx.status = 401;
      ctx.body = passwordPage.markup(true);
      return;
    }
  }
  return next();
});

app.use(async (ctx, next) => {
  try {
    await next();
    if (!ctx.body) {
      console.error(`No matching routes for ${ctx.originalUrl}`);
      ctx.status = 404;
      ctx.body = 'Not Found';
    }
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.error(`Got 404 for ${ctx.request.originalUrl}`);
      ctx.status = 404;
      ctx.body = 'Not Found';
      return;
    } else if (e instanceof RedirectException) {
      ctx.status = 302;
      ctx.set('Location', e.toURL);
      return;
    } else if (e instanceof AuthRequiredException) {
      ctx.status = 401;
      ctx.body = passwordPage.markup();
      return;
    } else {
      console.error(`Unexpected error type: ${e.constructor.name}`);
    }
    console.error(e);
    ctx.status = 500;
    ctx.body = '500 Server Error';
  }
});

router.get('/favicon.ico', proxy);

mountRoute('home');
mountRoute('episode');
mountRoute('page');

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
