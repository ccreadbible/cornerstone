var services = require('../common');
var fs = require('fs');
var path = require('path');
var today = services.getToday();
var yesterday = services.getYesterday();
var t_file, y_file;

module.exports = {
    /*fetch today's bilbe chapter*/
    get: function (req, res) {
      t_file = path.join(__dirname, $config.paths.archive + 'bible-'+today.year+
          '-'+today.month+'-'+today.date+'.json');
      y_file = path.join(__dirname, $config.paths.archive + 'bible-'+yesterday.year+
          '-'+yesterday.month+'-'+yesterday.date+'.json');

      if(fs.existsSync(t_file)){
        fs.readFile(t_file, function(err, data){
          if(err) 
            console.log(err);
          res.status(200).json(JSON.parse(data));
        });
      }
    },
    compose: function() {
      t_file = path.join(__dirname, $config.paths.archive + 'bible-'+today.year+
          '-'+today.month+'-'+today.date+'.json');
      y_file = path.join(__dirname, $config.paths.archive + 'bible-'+yesterday.year+
          '-'+yesterday.month+'-'+yesterday.date+'.json');
      var result;

      //load data from yesterday's verses
      fs.readFile(y_file, function(err, data){
        if(err) throw err;
        result = JSON.parse(data);
      });

      var url = $config.bibleHost+today.year+'/'+today.month+'/'+today.year+'-'+
          today.month+'-'+today.date+'.html';
      //fetch today's verse of the day from ccreadbible.org
      services.fetchPage(url, function(data){
        result = result || {verses:[]};
        result.verses.push(services.loadHTML(data))
       
        //save fetched data to a json file
        fs.writeFile(t_file, JSON.stringify(result), function(err){
          if(err) console.log(err);
        });

      });
    }
};

