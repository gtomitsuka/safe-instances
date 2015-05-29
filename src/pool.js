/* Check LICENSE for details. Developed by Oratio.io */

//Node Standard Modules
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

//NPM Modules
var Promise = require('bluebird');
var messenger = require('messenger');

//safe-instances Modules
var util = require('./util');

//Pooling Function
function Pool(size, commandType){
  this.size = size;

  this._processes = [];
  this._handlers = {};

  function handler(message){
    var handlerFunction = this._handlers[message.id];
    if(handlerFunction !== null){
      handlerFunction(null, message.userMessage);
    }else{
      throw new Error('No handler specified for this message.');
    }
  }

  var childFile = path.join(__dirname, 'child.js');
  for(var i = 0; i < size; i++){
    var child = child_process.spawn(Child.commandType, [childFile, 'pool'], { stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
    child.on('message', handler);
    this._processes[i] = {process: child, id: i, inUse: false};
  }
}

Pool.prototype.getProcess = function(){
  for(var i = 0; i < this.size; i++){
    if(this._processes[i].inUse === false)
      return this._processes[i];
  }

  return null;
}

module.exports = Pool;
