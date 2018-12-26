'use strict';

var mysql = require('mysql');
var Promise = require('q');
var configFile = require('./config.js').getConfigJson();
var databaseConfig = require('../config/' + configFile).database;
var decrypt = require('../lib/crypt.js').decrypt;
var JDBC_MYSQL = exports;

var pool = mysql.createPool({
    connectionLimit: databaseConfig.connection_limit,
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    port: databaseConfig.port,
    database: databaseConfig.schema,
    dateStrings: true
});

/**
 * Run database query
 * @param  {String} query
 * @param  {Object} [params]
 * @return {Promise}
 */
JDBC_MYSQL.query = function(query, params) {
  console.log(query);
  console.log(params);
    var defer = Promise.defer();
    var tempParams = params || {};
    pool.getConnection(function(err, connection) {
        if (err) {
            if (connection) {
                connection.release();
            }
            return defer.reject(err);
        }
        connection.query(query, tempParams, function(err, results){
            if (err) {
                if (connection) {
                    connection.release();
                }
                console.log(err);
                return defer.reject(err);
            }
            connection.release();
            var _results = JSON.stringify(results);
            defer.resolve(JSON.parse(_results));
        });
    });
    return defer.promise;
};

var loopQuery = function(connection, querys, params, index, defer) {

    var query = querys[index];
    var param = params[index];
    connection.query(query, param, function(err){
        if (err) {
            if (connection) {
                connection.release();
            }
            return defer.reject(err);
        }
        if (querys.length - 1 <= index) {
            connection.commit(function(err){
                if (err) {
                    return connection.rollback(function(){
                        return defer.reject(err);
                    });
                }
            });
            connection.release();
            return defer.resolve({status:'success'});
        } else {
            index ++;
            loopQuery(connection, querys, params, index, defer);
        }
    });
};

/**
 * Run database multi query
 * @param  {Array} querys
 * @param  {Array} [params]
 * @return {Promise}
 */
JDBC_MYSQL.transactionQuery = function (querys, params) {
    var defer = Promise.defer();
    pool.getConnection(function(err, connection) {
       if (err) {
            if (connection) {
                connection.release();
            }
            return defer.reject(err);
        }

        if (querys.length !== params.length) {
            return defer.reject('querys length is not match with params length');
        }
        connection.beginTransaction(function(err){
            if (err) {
                if (connection) {
                    connection.release();
                }
                return defer.reject(err);
            }
            loopQuery(connection, querys, params, 0, defer);
        });

    });
    return defer.promise;
};

JDBC_MYSQL.multiQuery = function (querys, params) {
    var promises = [];
    for (var i = 0; i < querys.length; i++) {
        promises.push(JDBC_MYSQL.query(querys[i], params[i]));
    }

    return Promise.all(promises);
};
