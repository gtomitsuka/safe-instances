/* by Oratio.io */

//Modules
var child_process = require('child_process');
var fs = require('fs');
var child = require('./child');

function Child(location, encoding, commandType){
  this.encoding = encoding || 'utf8';
  this.commandType = commandType || 'node';
  fs.readFile(location, this.encoding, function(error, file){
    this.file = file;
  });
}

Child.prototype.spawn = function(){
  return child_process.spawn(this.commandType, [this.file], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
}

module.exports = Child;
