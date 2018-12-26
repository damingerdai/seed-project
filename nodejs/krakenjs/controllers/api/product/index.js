'use strict';

const productService = require('../../../services/product.service');

module.exports = function(router) {

    //访问首页
    router.get('/', function(req, res) {
        res.send({
            statusCode: 200,
            data: productService.list()
        })
    });
};
