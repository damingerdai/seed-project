var jpath = require('json-path')
, http = require('http')
, util = require('util')
;
var data = {
    data : {
        exp : "12231"
    }
  };
 
function processResponse(json) {
    console.log( jpath.resolve(json, "/data/exp")[0] );
}
 
processResponse(data);