var config = require('./config')
var session = require('express-session')

var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function() {
  var app = express();

  // use logging and compress in different NODE_ENV
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  // use body-parser, method-override
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // session management
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  /****** VIEW ********/
  app.set('views', 'app/views');
  app.set('view engine', 'ejs');


  require('../app/routes/index.server.routes.js')(app);

  app.use(express.static('./public'));

  return app;
};
