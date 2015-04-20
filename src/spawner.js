/* by Oratio.io */

//Modules
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

function Child(locationOrCode, timeout, isFile, encoding, commandType){
  this.encoding = encoding || 'utf8';
  this.commandType = commandType || 'node';
  this.timeout = timeout || 6 * 60;
  this.logs = true; //Change as needed
  this._isReady = false;
  this.isFile = isFile || true;
  if(!isFile){
    this.file = locationOrCode;
    this._isReady = true;
  }
}

Child.prototype.loadScript = function(){
  if(this.isFile === false){
    fs.readFile(locationOrCode, this.encoding, function(error, file){
      if(error)
        throw error;
      
      this.file = file;
      this._isReady = true;
      return Promise.resolve();
    });
  }
}

Child.prototype.spawn = function(){
  if(this._isReady === false)
    throw new Error('file is not loaded');
  
  var args = [__dirname + '/child.js', this.file, this.timeout.toString()];
  var child = child_process.spawn(this.commandType, args, { stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
  child.stdout.on('data', function(data) {
    console.log(data.toString()); 
  });
  return child;
}

module.exports = Child;
