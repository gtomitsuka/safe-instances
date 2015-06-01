/* Check LICENSE for details. Developed by Oratio.io */

//Node Standard Modules
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

//NPM Modules
var Promise = require('bluebird');

//safe-instances Modules
var util = require('./util');
var adapter = require('./adapter');

function Child(_code, _pool, _timeout){
  this.code = _code;
  this.pool = _pool;
  this.timeout = _timeout;
  this.process = this.pool.getProcess();
  this.adapter = new Child.Adapter(this);
}

Child.prototype.start = function(){
  this.adapter.init();

  this.process.send({
    code: this.code,
    timeout: this.timeout,
    messageHandler: this.adapter.messageHandler //Will be run before code on process.
  });
}

Child.process.kill = function(signal){
  this.process.kill(signal); //New process creation is handled by
}

//Inter-process communication
Child.prototype.contact = function(params){
  return new Promise(function(resolve, reject){
    this.adapter.contactChild(params)
    .then(resolve, reject);
  });
}

function ChildFile(location, _pool, _timeout){
  this.pool = _pool;
  this.timeout = _timeout;
  this.process = this.pool.getProcess();
  this.adapter = new Child.Adapter(this);

  var self = this;
  return new Promise(function(resolve, reject){
    if(ChildFile.usesCache === false || (ChildFile.usesCache === true && cache[location] == undefined)){
      fs.readFile(location, self.encoding, function(error, file){
        if(error)
          throw error;

        self.code = file;
        cache[location] = file;
        resolve();
      });
    }else{
      self.code = cache[location];
      process.nextTick(function(){
        resolve();
      });
    }
  });
}

ChildFile.prototype = Object.create(Child.prototype);
ChildFile.prototype.constructor = ChildFile;

//Child's Constructor Properties
Child.Adapter = adapter.Message; //Default Adapter.

//Exported functions
module.exports = Child;
