var config = require('./config')
var session = require('express-session')

var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var passport = require('passport');

var flash = require('connect-flash');

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

  /****** AUTHENTICATION *******/
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  // XXX: need to be before all *.routes.js, so that /public/[users,articles,...]/*.js can be served
  // FIXME: articles/*.js does not serve as static
  app.use(express.static('./public'));
  
  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/user.server.routes')(app);
  require('../app/routes/articles.server.routes')(app);

  return app;
};
