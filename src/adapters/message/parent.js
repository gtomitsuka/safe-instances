/* Check LICENSE for details. Developed by Oratio.io */

/* Adapter: Inter-process Messages
   Description: Uses default, built-in child_process messages. */

var Promise = require('bluebird');
var util = require('../../util');
function Adapter(child){
  this.child = child;
  this.callbacks = {};

  this.child.process.on('message', function(result){
    this.callbacks[result.id](result.message);
  }.bind(this));
}

Adapter.prototype.contact = function(handler, message, callback){
  return new Promise(function(resolve){
    var id = util.getRandomInt(1, 999999);
    var block = {type: 'contact', value: message, handler: handler, id: id};

    function callbackFunction(value){
      resolve(value);
      if(callback != null)
        callback(value);

      this.callbacks[id] = null; //Delete reference after done.
    }.bind(this);

    this.callbacks[id] = callbackFunction;
    this.child.process.send(block);
  }.bind(this));
}

module.exports = Adapter;
