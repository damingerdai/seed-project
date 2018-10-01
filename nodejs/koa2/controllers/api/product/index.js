'use strict';

const productService = require('../../../service/product.service');

module.exports = (router) => {
    router.get('/', async (ctx) => {
        ctx.rest({
            statusCode: 200,
            data: productService.list()
        })
    });
    return router;
};