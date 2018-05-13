import * as Router from 'koa-router';

export default (router: Router, wsRouter: Router) => {
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

  wsRouter.get('/ws-test', async (ctx, next) => {
    const x = setInterval(() => ctx.websocket.send(Date.now()), 2000);
    ctx.websocket.on('close', () => {
      clearInterval(x);
    });
  });
};
