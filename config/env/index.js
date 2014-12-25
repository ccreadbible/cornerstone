// Default config for server (config/env/index.js)
// -----------------------------------------------
// WIll be overwritten and or extended dependent on whatever the **NODE_ENV** is

'use strict';

var all = {
  // **env** the **NODE_ENV** of the server
  env: process.env.NODE_ENV,

  // **port** used to create basic server, defaults to 8080
  port: process.env.PORT || 8080,

  paths: {
    archive: '../../archive/'
  },

  bibleHost: 'http://www.ccreadbible.org/Members/Bona/ccreadbible/maindata/',

  homilyHost: 'http://www.ccreadbible.info/media/com_podcastmanager/'

};

// Extend or override default config based off **NODE_ENV**. There is a
// different file for each env; testing, development, production
module.exports = _.merge(all, require('./' + process.env.NODE_ENV) || {} );