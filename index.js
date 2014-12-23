process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var router = require('./api/routes');
var http = require('http');

var app = express();
app.use(bodyParser.json());

require('./config/globals');
app.use('/api', router);
//app.use(express.static(path.join(__dirname, '/../client')));
// app.get('/', function (req, res) {
//   res.sendfile(path.join(__dirname, '/../client/index.html'));
// });

app.listen($config.port);
console.log('server listening to '+ $config.port);
