/* by Oratio.io */

//Modules
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');

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
  if(this.isFile === true){
    throw new Error('No need to load script when script is given as a string.');
  }
  return new Promise(function(resolve, reject){
    fs.readFile(locationOrCode, this.encoding, function(error, file){
      if(error)
        throw error;
      
      this.file = file;
      this._isReady = true;
      resolve();
    });
  });
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
