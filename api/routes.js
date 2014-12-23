var dailybible = require('./dailybible');
var router = require('express').Router();
var controllers = {
  dailybible: dailybible
};

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get);
}

module.exports = router;

