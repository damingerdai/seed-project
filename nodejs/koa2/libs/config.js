'use strict';

var getConfigFile = () => {
    if (process.env.Config) {
        return '../config/' + process.env.Config + '.json';
    } else {
        return '../config/config.json';
    }
}

module.exports = getConfigFile;