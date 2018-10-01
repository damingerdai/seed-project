'use strict';

module.exports = (router) => {
    router.get('/', async (ctx) => {
        ctx.response.redirect('/index.html');
    });
    return router;
  };
