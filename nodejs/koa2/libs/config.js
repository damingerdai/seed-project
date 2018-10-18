'use strict';

var getConfigFile = () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV != 'default') {
        return process.env.NODE_ENV + '.json';
    } else {
        return 'config.json';
    }
}

module.exports =  { getConfigFile };