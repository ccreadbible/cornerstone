var services = require('../common');
var fs = require('fs');
var path = require('path');

module.exports = {
    /*fetch today's bilbe chapter*/
    get: function (req, res) {
      var today = new Date();
      var year = today.getFullYear(), month = today.getMonth()+1, 
          date = (today.getDate()<10)? '0'+today.getDate(): today.getDate();
      
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);

      var file = path.join(__dirname, $config.paths.archive + 'bible-'+year+'-'+month+'-'+date+'.json');
      var oldFile = path.join(__dirname, $config.paths.archive + 'bible-'+
                              yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+
                              '-'+((yesterday.getDate()<10)? '0'+yesterday.getDate(): yesterday.getDate())+'.json');
      
      var url = $config.bibleHost+year+'/'+month+'/'+year+'-'+month+'-'+date+'.html';
      //read today's verses
      if(fs.existsSync(file)){
        fs.readFile(file, function(err, data){
          console.log(data);
          if(err) 
            console.log(err);
          res.status(200).json(JSON.parse(data));
        });
      }else{
        var result;

        //load data from yesterday's verses
        if(fs.existsSync(oldFile)){
         
          fs.readFile(oldFile, function(err, data){
            if(err) throw err;
            result = JSON.parse(data);
          });
          
        }
        //fetch today's verse of the day from ccreadbible.org
        services.fetchPage(url, function(data){
          result = result || {verses:[]};
          result.verses.push(services.loadHTML(data))
         
          //return result to client
          res.status(200).json(result);

          //write fetched data to a json file
          fs.writeFile(file, JSON.stringify(result), function(err){
            if(err) console.log(err);
          });

        });
      }

    }
};

