const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const enrouten = require('./libs/enrouten');
const advice = require('./middlewares/advice').advice;
const configFile = require('./libs/config').getConfigFile();
const config = require('./config/' + configFile);
const app = new Koa();

app.use(advice());
app.use(serve(__dirname + '/views'));
app.use(bodyParser());
app.use(rest());
app.use(enrouten({directory:'controllers'}));


app.listen(config.port);