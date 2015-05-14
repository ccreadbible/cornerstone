//api/routes.js
//---------------
//route dispatcher

var readings = require('./readings');
var homily = require('./homily');
var router = require('express').Router();
var controllers = {
  readings: readings,
  homily: homily
};

//it will run GET request when url matches properties in controllers
for (var route in controllers) {
  router.route("/" + route).get(controllers[route].get);
}

module.exports = router;

