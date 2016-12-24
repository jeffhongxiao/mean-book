process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express.js');

var app = express();
app.listen(3000);

module.exports = app;

console.log('Server running on port: 3000');
