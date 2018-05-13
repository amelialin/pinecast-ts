import * as Koa from 'koa';
import * as Router from 'koa-router';
import websockify = require('koa-websocket');

import routes from './routes';

const app = websockify(new Koa());

app.use(async (ctx, next) => {
  try {
    await next();
    if (!ctx.body) {
      console.error(`No matching routes for ${ctx.originalUrl}`);
      ctx.status = 404;
      ctx.body = 'Not Found';
    }
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = '500 Server Error';
  }
});

const router = new Router();
const wsRouter = new Router();
routes(router, wsRouter);

app.use(router.routes()).use(router.allowedMethods());
app.ws.use(wsRouter.routes()).use(wsRouter.allowedMethods());

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
