'use strict';

var Config = exports;

Config.getConfigJson = function () {
  var nodeEnv = process.env.NODE_ENV;
  if(!nodeEnv || nodeEnv === 'default') {
  	return 'config.json';
  } else {
  	return nodeEnv + '.json';
  }
};