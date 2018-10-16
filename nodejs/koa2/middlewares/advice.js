'use strict'

const logger = require('../libs/logger').commonLogger();

let filter = (url, pattern) => {
    if (url && url.trim().length > 0) {
        return pattern.test(url.trim());
    } else {
        return false;
    }
}

let advice = (pattern) => {
    pattern = pattern || /.ttf|.woff2|.css|.html|.js|.jpg|.png|.svg/i
    return async(ctx, next) => {
        if (filter(ctx.request.url, pattern)) {
            await next();
        } else {
            const begin = Date.now();
            logger.info(`url: ${ctx.request.url},method: ${ctx.request.method}`);
            await next();
            const ms = Date.now() - begin;
            logger.info(`url: ${ctx.request.url},method: ${ctx.request.method}, spend time : ${ms} ms`);
        }
    };
}

module.exports = {
    advice
}
