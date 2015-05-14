process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var schedule = require('node-schedule');
var readings = require('./api/readings');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var router = require('./api/routes');
var http = require('http');

var app = express();
app.use(bodyParser.json());

require('./config/globals');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//schedule composing readings at 00:01 everyday
var j = schedule.scheduleJob('1 0 * * *', function(){
  readings.compose();
});

app.use('/api', router);

app.listen($config.port);
console.log('server listening to '+ $config.port);
