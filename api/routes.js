var readings = require('./readings');
var router = require('express').Router();
var controllers = {
  readings: readings
};

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get);
}

module.exports = router;

