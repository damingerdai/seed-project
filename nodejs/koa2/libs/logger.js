'use strict';

const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: {
            type: 'stdout'
        },
        common: {
            type: 'dateFile',
            filename: 'logs/common.log',
            pattern: 'common-YYYY-MM-dd.log',
        }
    },
    categories: {
        default: {
            appenders: [
                'out',
                'common'
            ],
            level: 'info'
        }
    }
});

var consoleLogger = () => log4js.getLogger();
var commonLogger = () => log4js.getLogger('common');

module.exports = {
    consoleLogger,
    commonLogger
}