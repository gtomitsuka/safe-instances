/* by Oratio.io */

//Modules
var child_process = require('child_process');
var fs = require('fs');

function Child(location, timeout, filename, encoding, commandType){
  this.encoding = encoding || 'utf8';
  this.commandType = commandType || 'node';
  this.filename = filename;
  this.timeout = timeout || 6 * 60;
  this._isReady = false;
  fs.readFile(location, this.encoding, function(error, file){
    if(error)
      throw error;
      
    this.file = file;
    this._isReady = true;
  });
}

Child.prototype.spawn = function(){
  if(this._isReady === true){
  var args = ['./child', this.filename, this.file, this.timeout.toString()];
  return child_process.spawn(this.commandType, args, { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
  }else{
    throw new Error('file is not loaded');
  }
}

module.exports = Child;
