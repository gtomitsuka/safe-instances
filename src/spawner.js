/* by Oratio.io */

//Modules
var child_process = require('child_process');
var fs = require('fs');

function Child(location, timeout, filename, encoding, commandType){
  this.encoding = encoding || 'utf8';
  this.commandType = commandType || 'node';
  this.filename = filename;
  this.timeout = timeout || 6 * 60;
  fs.readFile(location, this.encoding, function(error, file){
    this.file = file;
  });
}

Child.prototype.spawn = function(){
  return child_process.spawn(this.commandType, [this.filename, this.file, this.timeout.toString()], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
}

module.exports = Child;
