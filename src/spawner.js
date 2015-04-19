/* by Oratio.io */

//Modules
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

function Child(location, timeout, filename, encoding, commandType){
  this.encoding = encoding || 'utf8';
  this.commandType = commandType || 'node';
  this.filename = filename;
  this.timeout = timeout || 6 * 60;
  this._isReady = false;
  
  var self = this;
  fs.readFile(location, this.encoding, function(error, file){
    if(error)
      throw error;
      
    self.file = file;
    self._isReady = true;
  });
}

Child.prototype.spawn = function(){
  if(this._isReady === false)
    throw new Error('file is not loaded');
  
  console.log(path.resolve('./child'));
  var args = ['./child', this.filename, this.file, this.timeout.toString()];
  return child_process.spawn(this.commandType, args, { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
}

module.exports = Child;
