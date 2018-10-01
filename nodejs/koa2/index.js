const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const enrouten = require('./libs/enrouten');
const advice = require('./middlewares/advice').advice;
const rest = require('./middlewares/rest').restify;
const app = new Koa();

app.use(advice);
app.use(serve(__dirname + '/views'));
app.use(bodyParser());
app.use(rest());
app.use(enrouten({directory:'controllers'}));


app.listen(3000);