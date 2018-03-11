'use strict';
//db
const db = require( './db' );
//packages
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
//router
const index = require('./routes/index');
const users = require('./routes/users');
const books = require('./routes/books');
const tables = require('./routes/tables');
const authors = require('./routes/authors');

//app
const app = express();

//APP SETUP
//logger
app.use(logger('dev'));
//session
app.use(session({
	name: '_liber.sid',
    store: new FileStore,
    secret: 'malicious fork',
    httpOnly: false,
    resave: false,
	saveUninitialized: false,
}));

//express.static
let halfDay = 43200000;
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public', { maxAge: halfDay }));
//app.use('/books', express.static(__dirname + '/books', { maxAge: '10y' }));

//body-parser
app.use(bodyParser.json());
//serve-favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
//routes
app.use('/',index);
app.use('/users', users);
app.use('/books', books);
app.use('/tables', tables);
app.use('/authors', authors);




let port = process.env.PORT || '4000';
app.set('port', port);

app.listen(port, () => {
  console.log('App listening on port ' + port);
});

module.exports = app;
