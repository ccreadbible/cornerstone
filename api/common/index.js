/*utility functions can be used across modules*/
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  fetchPage: function(url, callback){
    request(url, function(error,response, body){
      if (!error && response.statusCode == 200) {
        callback(body);
      }
      if(error)
        console.error(error);
    });
  },

  loadHTML: function(data, cb){
    $ = cheerio.load(data.toString());

    var content = $('hr').first().nextAll();
    var reading1 = '', gospel = ''
    origin_reading1 = '', origin_gospel = '';
    var isReading1 = true;
   
    content.each(function(index, el){
      if(el.name === 'hr') isReading1 = false;

      if(isReading1){ 
        origin_reading1 += $(this).text();
        reading1 += '<p>' + $(this).text() + '</p>';
      }else{
        origin_gospel += $(this).text();
        gospel += '<p>' + $(this).text() + '</p>';
      }
    });

    var output = {
      date: $('#parent-fieldname-title').text(),
      description: $('#parent-fieldname-description').text(),
      reading1: reading1,
      gospel: gospel,
      origin_reading1: origin_reading1,
      origin_gospel: origin_gospel
    };

    cb(output);

  },

  getToday: function(){
    var date = new Date();
    var month = date.getMonth()+1;
    return{
      year: date.getFullYear(),
      month: (date.getMonth()+1 < 10)? '0'+(date.getMonth()+1):date.getMonth()+1,
      date: (date.getDate()<10)? '0'+date.getDate(): date.getDate()
    };
  },

  getYesterday: function(){
    var date = new Date();
    date.setDate(date.getDate()-1);
    var month = date.getMonth()+1;

    return{
      year: date.getFullYear(),
      month: month<10? '0'+month : month,
      date: (date.getDate()<10)? '0'+date.getDate(): date.getDate()
    };
  },

  getLast5Days: function(){
    var count = 0
    var results = [];
    while(count < 5){
     // console.log(count);
      var date = new Date();
      date.setDate(date.getDate() - count);
      var month = date.getMonth()+1;
      
      results.push({
        year: date.getFullYear(),
        month: (date.getMonth()+1 < 10)? '0'+(date.getMonth()+1):date.getMonth()+1,
        date: (date.getDate()<10)? '0'+date.getDate(): date.getDate()
      });
      count++;
    }
    return results;
  }
};
