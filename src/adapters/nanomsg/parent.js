// nanomsg Adapter

//NPM Modules
var nano = require('nanomsg');
var Promise = require('bluebird');

//safe-instances Modules
var util = require('../util');

function Adapter(child){
  this.child = child;
  this.callbacks = {};
  this.socket = nano.socket('req');
  this.address = 'ipc://safe-instances.local/';
  this.child.process.on('message', function(result){
    this.callbacks[result.id](result.message);
  }.bind(this));
}

Adapter.prototype.init = function(){
  this.socket.bind(this.address);
  this.socket.on('message', function(_result){
    var result = JSON.stringify(_result.toString())
    this.callbacks[result.id](result.message);
  }.bind(this));
}

Adapter.server = 'child';
module.exports = Adapter;
