var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var api = require('./routes/api');
var users = require('./routes/users');
var members = require('./routes/members');
var sounds = require('./routes/sounds');
var featuredurls = require('./routes/featuredurls');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());

app.use('/', index);
// app.use('/api', api);
// app.use('/users', users);
// app.use('/members', members);
app.use('/sounds', sounds);
// app.use('/featuredurls', featuredurls);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;
