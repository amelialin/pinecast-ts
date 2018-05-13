import * as Koa from 'koa';
import * as Router from 'koa-router';
import websockify = require('koa-websocket');

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
router.get('/', async (ctx, next) => {
  ctx.status = 302;
  ctx.set('Location', 'https://pinecast.com/');
});
router.get('/test', async (ctx, next) => {
  ctx.body = `
  <script>
  const ws = new WebSocket(\`$\{
    location.protocol === 'https:' ? 'wss' : 'ws'
  }://$\{location.host}/ws-test\`, 'pt-eng');
  ws.onmessage = event => {
    document.write(\`<p>$\{event.data}</p>\`);
  };
  </script>
  `;
});

const wsRouter = new Router();
wsRouter.get('/ws-test', async (ctx, next) => {
  const x = setInterval(() => ctx.websocket.send(Date.now()), 2000);
  ctx.websocket.on('close', () => {
    clearInterval(x);
  });
});

app.use(router.routes()).use(router.allowedMethods());
app.ws.use(wsRouter.routes()).use(wsRouter.allowedMethods());

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
