// Mailer, used to send emails (services/mailer.js)
// ------------------------------------------------

var mailer = require('nodemailer');
var sender = mailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'chiahsin.santos@gmail.com',
    pass: 'chiahsin'
  }
});

var options = {
  from: 'ccreadbible.org'
};

function Mailer(transport) {
  this.sender = transport || sender;
  this.options = options;
}

Mailer.prototype.send = function(options) {
  var future = $q.defer();
  options = options || {};
  
  _.merge(options, this.options);

  this.sender.sendMail(options, function(error){
    error ? future.reject(error) : future.resolve();
  });

  return future.promise;
};


module.exports = Mailer;