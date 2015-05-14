var services = require('../common');
var fs = require('fs');
var path = require('path');
var today = services.getToday();

module.exports = {
    /*fetch today's bilbe chapter*/
    get: function (req, res) {
      var t_file = path.join(__dirname, $config.paths.archive + 'bible-'+today.year+
          '-'+today.month+'-'+today.date+'.json');

      var readFile = function(file) {
        fs.readFile(file, function(err, data) {
          if(err) 
            throw err;
          res.status(200).json(JSON.parse(data));
        });
      };
      
      //read today's reading
      if(fs.existsSync(t_file)) {
        readFile(t_file);
      }else{
        throw new Error('today\'s reading does not exist');
      }
    },
    compose: function() {
      var past = services.getLast5Days();
      var t_file = path.join(__dirname, $config.paths.archive + 'bible-'+today.year+
          '-'+today.month+'-'+today.date+'.json');
      var result = {verses:[]}, count = 0;

      past.forEach(function(day, index) {
        var url = $config.bibleHost+day.year+'/'+day.month+'/'+day.year+'-'+day.month+'-'+day.date+'.html';
        services.fetchPage(url, function(data) {
          services.loadHTML(data, function(output){
            result.verses[index] = output;
            count++;
            //write fetched data 
            if(count === 5){
              fs.writeFile(t_file, JSON.stringify(result), function(err) {
                if(err)
                  console.log(err);
              });
            }
          });
        });
      });
    }
};

