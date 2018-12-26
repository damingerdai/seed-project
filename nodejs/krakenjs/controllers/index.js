'use strict';

module.exports = function(router) {

    //访问首页
    router.get('/', function(req, res) {
        console.log(req);
        res.render('index');
    });
};
