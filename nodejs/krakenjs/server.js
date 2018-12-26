'use strict';

var app = require('./index');
var util = require('util');
var http = require('http');
var logger = require('./lib/logger').getAccessLogger();

var server;

/*
 * Create and start HTTP server.
 */

server = http.createServer(app);
server.listen(process.env.PORT || 8080, process.env.HOST || '127.0.0.1');
server.on('listening', function () {
   logger.info('Sails cast upon http://%s:%d', this.address().address, this.address().port);
});


server.timeout = 2 * 60 * 1000;
