//api/homily/index.js
//--------------------
//return homily links for the past week
var services = require('../common');

module.exports = {
    //generate homily links for past week 
    get: function (req, res) {

      var days = services.getLast7Days(); 
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

