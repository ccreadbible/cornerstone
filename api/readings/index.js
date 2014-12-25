var services = require('../common');
var fs = require('fs');
var path = require('path');

module.exports = {
    /*fetch today's bilbe chapter*/
    get: function (req, res) {
      var today = services.getToday();
     
      var yesterday = services.getYesterday();

      var t_file = path.join(__dirname, 
        $config.paths.archive + 'bible-'+today.year+'-'+today.month+'-'+today.date+'.json');
      var y_file = path.join(__dirname, 
        $config.paths.archive + 'bible-'+yesterday.year+'-'+yesterday.month+'-'+yesterday.date+'.json');
      
      //read today's verses
      if(fs.existsSync(t_file)){
        fs.readFile(t_file, function(err, data){
          if(err) 
            console.log(err);
          res.status(200).json(JSON.parse(data));
        });
      }else{
        var result;

        //load data from yesterday's verses
        if(fs.existsSync(y_file)){
         
          fs.readFile(y_file, function(err, data){
            if(err) throw err;
            result = JSON.parse(data);
          });
          
        }

        var url = $config.bibleHost+today.year+'/'+today.month+'/'+today.year+'-'+today.month+'-'+today.date+'.html';
        //fetch today's verse of the day from ccreadbible.org
        services.fetchPage(url, function(data){
          result = result || {verses:[]};
          result.verses.push(services.loadHTML(data))
         
          //return result to client
          res.status(200).json(result);

          //write fetched data to a json file
          fs.writeFile(t_file, JSON.stringify(result), function(err){
            if(err) console.log(err);
          });

        });
      }

    }
};

