//Simple Test Child.
//Folders must be separate because Mocha crawls it all :P
var http = require('http');

process.handle('parentMessage', function(value, callback){
  callback(value);
});

process.handle('minimalValue', function(value, callback){
  callback(Math.min.apply(Math, value));
});

process.handle('timeoutedMessage', function(value, callback){
  setTimeout(function(){
    callback(value);
  }, 50)
});
