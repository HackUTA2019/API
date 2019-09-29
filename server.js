
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db_url = process.env.DB || require("./config/db");
var mongoose = require('mongoose');


const port = process.env.PORT || 8080;

console.log("Node server");

var indexRouter = require('./routes/routes');

var app = express();

var cors = require('cors');

mongoose.connect(db_url, {useNewUrlParser: true});
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
express.static.mime.define({'application/wasm': ['wasm']})

app.use(cookieParser());

app.use('/api/simulations/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`); 
});


module.exports = app;