var services = require('../common');
var fs = require('fs');
var path = require('path');

module.exports = {
    /*fetch today's bilbe chapter*/
    get: function (req, res) {
      var today = new Date();
      var year = today.getFullYear(), month = today.getMonth()+1, 
          date = (today.getDate()<10)? '0'+today.getDate(): today.getDate();
      
      var url = $config.bibleHost+year+'/'+month+'/'+year+'-'+month+'-'+date+'.html';
      var file = path.join(__dirname, $config.paths.archive + 'bible-'+year+'-'+month+'-'+date+'.html');

      if(fs.existsSync(file)){
        // console.log('reading file');
        fs.readFile(file, function(err, data){
          if(err) 
            console.log(err);

          var result = services.loadHTML(data);
          // console.log(result);
          result.file = file;
          res.status(200).json(result);
        });
      }else{
        // console.log('writing file');
        services.fetchPage(url, function(data){
          //write fetched data to a html file
          fs.writeFile(file, data, function(err){
            if(err) console.log(err);
          });

          var result = services.loadHTML(data);
          result.file = file;

         // console.log(result);
          res.status(200).json(result);
        });
      }

    }
};

