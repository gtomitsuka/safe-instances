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

function Child(code, pool, options){
  this.timeout = options.timeout || 60; //Defaults to 60 seconds
  this.logs = options.logs || true;
  this.code = code;
  this.pool = pool || null;
  this.speakerPort = options.speakerPort || util.getRandomInt(25010, 25400);
  this.listenerPort = options.listenerPort || this.speakerPort;
  this.speaker = messenger.createSpeaker(this.speakerPort);
  this.listener = messenger.createListener(this.listenerPort);
  
  //Private Properties
  this._messageHandler = {};
  this._errorHandler = {};
}

Child.prototype.setPool = function(pool){
  this.pool = pool;
}

Child.prototype.start = function(){
  var timeout = this.timeout.toString();
  var childProcess = this.pool.getProcess();

  childProcess.process.send({
    code: code,
    timeout: timeout,
    speakerPort: this.speakerPort,
    listenerPort: this.listenerPort
  });
  
  this.process = childProcess;
  return this.process;
}

Child.prototype.contact = function(messageType, message){
  return new Promise(function(resolve, reject){
    var requestId = util.getRandomInt(10001, 99999);

    var self = this;
    var handler = function(error, message){
      self.pool.inUse = false;
      if(error){
        return reject(error);
      }
      return resolve(message)
    }

    child.pool._handlers[requestId] = handler;
    this.process.send({messageType: message, id: requestId});
  })
}
Child.commandType = 'node';


//File Based.
function ChildFile(location, timeout){
  this.encoding = 'utf8';
  this.timeout = options.timeout || 60; //Defaults to 60 seconds
  this.logs = options.logs || true;
  this.code = code;
  this.pool = pool || null;
  this.speakerPort = options.speakerPort || util.getRandomInt(25010, 25400);
  this.listenerPort = options.listenerPort || this.speakerPort;
  this.speaker = messenger.createSpeaker(this.speakerPort);
  this.listener = messenger.createListener(this.listenerPort);
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

ChildFile.usesCache = true;
ChildFile.prototype.setPool = Child.prototype.setPool;
ChildFile.prototype.contact = Child.prototype.contact;
ChildFile.prototype.start = Child.prototype.start;

Child.File = ChildFile;

module.exports = Child;
