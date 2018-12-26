'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser=require('body-parser');
var kraken = require('kraken-js');
var session = require('express-session');
var MemoryStore = require('session-memory-store')(session);
var configFile = require('./lib/config.js').getConfigJson();
var configJson = require('./config/' + configFile);
var uuid = require('node-uuid');
/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
var options = {
    onconfig: function (config, next) {
        next(null, config);
    }
};

var app = module.exports = express();
 
app.use(session({
    name: 'NSESSIONID',
    secret: 'CRM Portal Secret',
    store: new MemoryStore()
  }));
app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use(kraken(options));

app.use(function(req, res, next) {
    req.headers["x-request-id"] = (req.headers["x-request-id"])?req.headers["x-request-id"]:uuid.v4();
    next();
});

app.on('start', function () {
    console.log('      ~__ ~__');
    console.log('      )__))__)~_');
    console.log('      )__))__))_)');
    console.log('    ___!___!___!______');
    console.log('    \\_Aming_/');
    console.log('  ~~~~~~~~~~~~~~~~~~~~~');
    console.log('Avast, ye swabs! This ship be ready to sail. Aarrg.');
    console.log('Current sea: %s', app.kraken.get('env:env'));
});
