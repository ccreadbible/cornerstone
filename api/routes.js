var readings = require('./readings');
var homily = require('./homily');
var router = require('express').Router();
var controllers = {
  readings: readings,
  homily: homily
};

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get);
}

module.exports = router;

