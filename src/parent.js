/* Check LICENSE for details. Developed by Oratio.io */

//Node Standard Modules
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

//NPM Modules
var Promise = require('bluebird');

//Promisified Functions
var readFile = Promise.promisify(fs.readFile);
var nextTick = Promise.promisify(process.nextTick);

//safe-instances Modules
var util = require('./util');
var messageAdapter = require('../messages');

function Child(_code, _pool, _timeout){
  this.code = _code;
  this.pool = _pool;
  this.timeout = _timeout;
  this.process = this.pool.getProcess();
  this.adapter = new Child.Adapter(this);

  //Process logs
  if(Child.logs === true){
    this.process.stdout.pipe(process.stdout);
    this.process.stderr.pipe(process.stderr);
  }
}

Child.prototype.start = function(){
  if(typeof this.adapter.init === 'function')
    this.adapter.init();

  this.process.send({
    type: 'init',
    code: this.code,
    timeout: this.timeout,
    isSafe: Child.isSafe,
    messageHandler: this.adapter.contactHandler //Will be run before code on process.
  });
}

Child.prototype.kill = function(signal){
  this.process.kill(signal); //New process creation is handled by
}

//Inter-process communication
Child.prototype.contact = function(handler, message){
  return this.adapter.contact(handler, message);
}

function ChildFile(location, _pool, _timeout){
  this.pool = _pool;
  this.timeout = _timeout;
  this.process = this.pool.getProcess();
  this.adapter = new Child.Adapter(this);


  if(ChildFile.usesCache === false || (ChildFile.usesCache === true && cache[location] == undefined)){
    return readFile(location, this.encoding)
    .then(function(error, file){
      if(error)
        throw error;

      this.code = file;
      cache[location] = file;
      return Promise.resolve();
    }.bind(this));
  }else{
    self.code = cache[location];
    return nextTick();
  }
}

ChildFile.prototype = Object.create(Child.prototype);
ChildFile.prototype.constructor = ChildFile;

//Child's Constructor Properties
Child.logs = true;
Child.isSafe = false;
Child.Adapter = messageAdapter; //Default Adapter.
Child.Pool = require('./pool');

//Exported functions
module.exports = Child;
