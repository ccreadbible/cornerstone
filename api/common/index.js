/*utility functions can be used across modules*/
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  fetchPage: function(url, callback){
    request(url, function(error,response, body){
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    });
  },

  loadHTML: function(data){
    $ = cheerio.load(data.toString());

    var content = $('hr').first().nextAll();
    var reading1 = '', gospol = '';
    var isReading1 = true;
   
    content.each(function(index, el){
      if(el.name === 'hr') isReading1 = false;

      if(isReading1){
        reading1 += '<p>' + $(this).text() + '</p>';
      }else{
        gospol += '<p>' + $(this).text() + '</p>';
      }
    });

    return {
      
      date: $('#parent-fieldname-title').text(),
      description: $('#parent-fieldname-description').text(),
      reading1: reading1,
      gospol: gospol

    };

  }
};
