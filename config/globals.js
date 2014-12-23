//    Globals (config/globals.js)
// ------------------------------
// Here is where we set up most of our global stuff
// Why do we want global stuff? There will be static modules that we use
// everywhere in this server, why keep requiring them in each file.
// **global** is the `window` of `node`. We also read the `api/` folder

// **colors** used for logging, takes over `String.prototype`
require('colors');

// **String.prototype.capitalize** used to cap first letter of a string
String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
};


// **_** `lodash` module
global._ = require('lodash');
// **$q** `Q` module
global.$q = require('q');
// **$config** the config object initialized in `index.js`
global.$config = require('./env');

// **$log** basic abstraction from `console.log()`, can be turned on or off by **$config.logging**
global.$log = $config.logging ? console.log : function(){};

var Mailer = require('../services/').mailer;
var mailer = new Mailer();

// **$handleError** global error handler function
global.$handleError = function(error, meta) {
  console.error(error.stack, meta);

  if ($config.env === 'production') {
    mailer.send({
      to: 'pretend15@gmail.com',
      subject: error.message,
      text: error.stack || meta
    })
    .finally(function(){
      process.exit(1);
    });
  }
};

process.on('uncaughtException', $handleError);