/* Check LICENSE for details. Developed by Oratio.io */

/* Adapter: Inter-process Messages
   Description: Uses default, built-in child_process messages. */

var Promise = require('bluebird');

function Adapter(child){
  this.child = child;
  this.child.process.on('message', function(result){
    this.child.callbacks[result.listener]();
  })
}

Adapter.prototype.init = function(){}; //Unnecessary.

Adapter.prototype.contact = function(type, message){
  return new Promise(function(resolve, reject){
    this.child.process.send({type: 'contact', listener: type, message: message});
  }.bind(this));
}

Adapter.prototype.contactHandler = function(){}.toString(); //For the Messages Adapter, handling is done by default.

module.exports = Adapter;
