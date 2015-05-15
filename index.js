//cornerstone/index.js
//--------------------
//This is where we start our app

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

//this will be executed for every request to the app
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//schedule composing readings at 00:01 everyday
var j = schedule.scheduleJob('23 * * * *', function(){
  readings.compose();
});

//when seeing '/api' in the path, direct the route through router 
app.use('/api', router);

app.listen($config.port);
console.log('server listening to '+ $config.port);
