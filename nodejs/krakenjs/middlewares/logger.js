'use strict';
var logger = require('../lib/logger').getAccessLogger();
var util = require('util');
var access_log_format = "[request_id=%s] [address=%s] [url=%s] [method=%s] [query=%s]";

module.exports = function() {

    var middleware = function(req, res, next) {
        var url = req.originalUrl;
        if (!(url.endsWith('.css')
            || url.endsWith('.map')
            || url.endsWith('.js')
            || url.endsWith('.jpg')
            || url.endsWith('.png')
            || url.endsWith('.json')
            || url.indexOf('fonts') > 0 )) {
            if (url.indexOf('?') > 0) {
                url = url.substring(0, url.indexOf('?'));
            }

            logger.info(util.format(access_log_format, req.headers["x-request-id"],
            req.connection.remoteAddress, url,
            req.method, req.query? JSON.stringify(req.query) : '{}'));
        }
        next();
    };

    return middleware;
}
