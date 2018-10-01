'use strict';

var rd = require('rd');
var path = require('path');
var strip = require('strip-path');
var Router = require('koa-router');
var mount = require('koa-mount');
var compose = require('koa-compose');
var fs = require('fs');

var dirname = require('app-root-path').toString();
var used = false;

var bootstrap = (options) => {
    // if (used) return async (next) => await next;
    used = true;
    var files = [];
    var routers = [];
    options = options || {};
    var directory = options.directory || 'controllers';
    var basename = options.basename || 'index.js';
    directory = path.join(dirname, directory);

    if (!fs.existsSync(directory)) {
        var err = 'directory ' + directory + " doesn't exist";
        throw new Error(err);
    }
    rd.eachFileFilterSync(directory, /\.js$/, (file) => {
        var dir = path.dirname(file);
        var base = path.basename(file);
        files.push({ dirname: dir, basename: base });
    });
    routers = files.map(file => {
        if (file && file.basename != basename) {
            file.basename = file.basename.substring(0, file.basename.length - 3)
            file.dirname = path.join(file.dirname, file.basename);
        }
        var route = '/' + strip(file.dirname, directory).trim().substring(1).replace('\\', '/');
        var router = require(file.dirname)(new Router());
        return mount(route, router.middleware());
    });
    this.larkBootstrap = true;
    return compose(routers);
};

module.exports = bootstrap;
