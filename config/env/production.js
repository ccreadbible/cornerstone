// Production config for server (config/env/production.js)
// -----------------------------------------------
'use strict';

module.exports = {
  // **ip** duh
  ip: process.env.IP || undefined,

  // **port** default port to 8080
  port: process.env.PORT || 8080,

  // **logging** use logging in the server with **$log** or not
  logging: false

};