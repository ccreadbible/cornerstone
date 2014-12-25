var services = require('../common');

module.exports = {
    //generate audio links to last 5 days' homily
    get: function (req, res) {

      var days = services.getLast5Days(); 
      var homilyLinks = [];

      days.forEach(function(d){
        homilyLinks.push({
          month: d.month,
          date: d.date,
          link: $config.homilyHost+d.year+'homily/'+d.year+d.month+d.date+'.mp3'
        });
      });
      res.status(200).json({homily: homilyLinks});

    }
};

