//Simple Test Child.
//Folders must be separate because Mocha crawls it all :P
var http = require('http');

process.handle('parentMessage', function(value, callback){
  callback(value)
});

process.handle('timeTakingMessage', function(value, callback){
  setTimeout(function(){
    callback(value);
  }, 50)
});

process.handle('httpReturningMessage', function(value, callback){
  var options = {
    host: 'example.com',
    port: 80,
    path: '/'
  };

  http.get(options, function(response){
    response.on('end', function(){
      callback();
    });
  }).on("error", function(error){
    throw error;
  });
});
