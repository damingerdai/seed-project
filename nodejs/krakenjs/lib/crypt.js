'use strict';

var crypto = require('crypto');
var fs = require('fs');
var Q = require('q');
var algorithm = 'aes-256-ctr';
var salt = 'dsapiportal';

var Crypto = exports;

Crypto.encrypt = function (text) {

  if(!isValidText(text)) {
  	return '';
  }

  var cipher = crypto.createCipher(algorithm,salt);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};

Crypto.decrypt = function (text) {

  if(!isValidText(text)) {
  	return '';
  }

  var decipher = crypto.createDecipher(algorithm, salt);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};

function isValidText (text) {
 	return typeof(text) === 'string'
         	&& text.trim() !== '';
}

Crypto.encryptMD5 = function(password) {
    var md5 = crypto.createHash('md5');
    var md = md5.update(password,'utf-8').digest();
    var j = md.length;
    var str = [];
    var k = 0;
    var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9','A', 'B', 'C', 'D', 'E', 'F');
    for (var i = 0; i < j; i++) {
      var byte0 = md[i];
      str[k++] = hexDigits[byte0 >>> 4 & 0xf];
      str[k++] = hexDigits[byte0 & 0xf];
    }
    return str.join('');
};

// console.log(Crypto.encryptMD5('123456'));
