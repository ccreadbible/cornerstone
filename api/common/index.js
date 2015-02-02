/*utility functions can be used across modules*/
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  fetchPage: function(url, callback){
    request(url, function(error,response, body){
      //console.log(body);
      if (!error && response.statusCode == 200) {
        callback(body);
      }
      if(error)
        console.error(error);
    });
  },

  loadHTML: function(data){
    $ = cheerio.load(data.toString());

    var content = $('hr').first().nextAll();
    var reading1 = '', gospel = '';
    var isReading1 = true;
   
    content.each(function(index, el){
      if(el.name === 'hr') isReading1 = false;

      if(isReading1){
        reading1 += '<p>' + $(this).text() + '</p>';
      }else{
        gospel += '<p>' + $(this).text() + '</p>';
      }
    });

    return {
      
      date: $('#parent-fieldname-title').text(),
      description: $('#parent-fieldname-description').text(),
      reading1: reading1,
      gospel: gospel

    };

  },

  getToday: function(){
    var date = new Date();

    return{
      year: date.getFullYear(),
      month: (date.getMonth()+1 < 10)? '0'+(date.getMonth()+1):date.getMonth()+1,
      date: (date.getDate()<10)? '0'+date.getDate(): date.getDate()
    };
  },

  getYesterday: function(){
    var date = new Date();
    date.setDate(date.getDate()-1);

    return{
      year: date.getFullYear(),
      month: date.getMonth()+1,
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
