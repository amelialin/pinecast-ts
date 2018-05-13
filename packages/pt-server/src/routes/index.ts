import * as Router from 'koa-router';

import testRoute from './test';

export default (router: Router, wsRouter: Router) => {
  router.get('/', async (ctx, next) => {
    ctx.status = 302;
    ctx.set('Location', 'https://pinecast.com/');
  });
  testRoute(router, wsRouter);
};
