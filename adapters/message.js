/* Check LICENSE for details. Developed by Oratio.io */

/* Adapter: Inter-process Messages
   Description: Uses default, built-in child_process messages. */

var Promise = require('bluebird');
var util = require('../src/util');
function Adapter(child){
  this.child = child;
  this.callbacks = {};

  this.child.process.on('message', function(result){
    this.callbacks[result.id](result.message);
  }.bind(this));
}

Adapter.prototype.init = function(){}; //Unnecessary.

Adapter.prototype.contact = function(handler, message, callback){
  var self = this;
  return new Promise(function(resolve){
    var id = util.getRandomInt(10000, 999999);
    var block = {type: 'contact', value: message, handler: handler, id: id};

    function callbackFunction(value){
      resolve(value);
      if(callback != null)
        callback(value);

      self.callbacks[id] = null; //Delete reference after done.
    }

    this.callbacks[id] = callbackFunction;
    this.child.process.send(block);
  }.bind(this));
}

Adapter.prototype.contactHandler = function(){}.toString(); //For the Messages Adapter, handling is done by default.

module.exports = Adapter;
