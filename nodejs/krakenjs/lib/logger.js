'use strict';
var log4js = require('log4js');
var LOGGER = exports;

log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'dateFile', //文件输出
      filename: 'logs/access.log',
      pattern : "-yyyy-MM-dd",
      category: 'access'
    },
    {
      type: 'file', //文件输出
      filename: 'logs/output.log',
      maxLogSize: 104857600,
      backups:3,
      category: 'output'
    }
  ]
});

LOGGER.getAccessLogger = function() {
  return log4js.getLogger('access');
};

LOGGER.getOutputLogger = function() {
  return log4js.getLogger('output');
};
