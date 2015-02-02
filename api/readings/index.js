var services = require('../common');
var fs = require('fs');
var path = require('path');

module.exports = {
    /*fetch today's bilbe chapter*/
    get: function (req, res) {
      var today = services.getToday();
      var past = services.getLast5Days();

      var t_file = path.join(__dirname, 
        $config.paths.archive + 'bible-'+today.year+'-'+today.month+'-'+today.date+'.json');

      var readFile = function(latest_file) {
        fs.readFile(latest_file, function(err, data) {
          if(err) 
            console.log(err);
          res.status(200).json(JSON.parse(data));
        });
      };

      var writeFile = function(file, data) {
        fs.writeFile(t_file, JSON.stringify(data), function(err) {
          if(err)
            console.log(err);
          else
            readFile(t_file);
        });
      };

      var fetchData = function() {
        var result = {verses:[]};

        past.forEach(function(day, index) {
          var url = $config.bibleHost+day.year+'/'+day.month+'/'+day.year+'-'+day.month+'-'+day.date+'.html';
          services.fetchPage(url, function(data) {
            var obj = services.loadHTML(data);
            result.verses.push(obj);
            if(index === 4){
              //write fetched data to a json file
              writeFile(t_file, result);
            }
          });
        });
      };
      
      //read today's reading
      if(fs.existsSync(t_file)) {
        readFile(t_file);
      }else{//load past 5 days readings
        fetchData();
      }

    }
};

