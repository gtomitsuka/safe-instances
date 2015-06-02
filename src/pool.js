/* Check LICENSE for details. Developed by Oratio.io */

//Node Standard Modules
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

//NPM Modules
var Promise = require('bluebird');

//safe-instances Modules
var util = require('./util');

//The Pool handles the
function Pool(size){
  this.processes = [];
  this.active = [];

  for(var i = 0; i < size; i++){
    this.processes[i] = child_process.spawn(Pool.command, [Pool.file], { stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
    this.active[i] = false;
  }
}

Pool.prototype.getProcess = function(id){
  if(id != null)
    return this.processes[id];

  for(var i = 0; i < this.size; i++){
    if(this.active[i] === false){

      return this.processes[i];
    }
  }

  return null;
}

Pool.prototype.killAll = function(signal){
  this.kill(signal);
}

Pool.command = 'node';
Pool.file = './child.js';

module.exports = Pool;
