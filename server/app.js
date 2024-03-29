// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
// const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/hyper-hacker';
mongoose.connect(dbURL, { }, (err) => {
  if (err) {
    // console.log('Could not connect to database');
    throw err;
  }
});

let redisURL = {
  hostname: 'redis-14538.c265.us-east-1-2.ec2.cloud.redislabs.com',
  port: 14538,
};
let redisPASS = 'S0DKBHfi3n5guS9NKv6RCR7Jfn3iHdHb';
if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[1];
}

const router = require('./router.js');
const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../dist/`)));
// TODO get a favicon image
// app.use(favicon(`${__dirname}/../dist/img/favicon.png`));

// Add the file upload package. This will place all uploaded files into req.files
app.use(fileUpload());
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS,
  }),
  secret: 'Hacker Hacker Hacker',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());

app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  console.log('Missing CSRF token');
  return false;
});

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  // console.log(`Listening on port ${port}`);
});
