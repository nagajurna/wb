'use strict';
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const express = require('express');
//router
const index = require('./routes/index');
const books = require('./routes/books');

//app
const app = express();

//APP SETUP
//logger
app.use(logger('dev'));
//express.static
let oneDay = 86400000;
app.use(express.static('public', { maxAge: 0 }));
//body-parser
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json());
//serve-favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
//routes
app.use('/',index);
app.use('/books', books);


let port = process.env.PORT || '4000';
app.set('port', port);

app.listen(port, () => {
  console.log('App listening on port ' + port);
});

module.exports = app;
