'use strict';

var request = require('request');
var uuid = require('node-uuid');
var Q = require('q');
var _ = require('lodash');

module.exports = function() {

    var middleware = function(req, res, next) {
        if ('user' in req) {
            next();
            return;
        }

        var accessToken = req.headers['access-token'];
        if (!accessToken) {
          // next('invalid access token');
          res.status(401);
          res.send('Assess denied');
        } else {
           next();
        }
    };

    var checkAccessToken = function(token) {
      return Q.resolve(true);
    };

    return middleware;
}
