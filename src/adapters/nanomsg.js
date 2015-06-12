// nanomsg Adapter
var nano = require('nanomsg');
var Promise = require('bluebird');

var socket;

function Adapter(child){
  this.child = child;
  this.callbacks = {};

  this.child.process.on('message', function(result){
    this.callbacks[result.id](result.message);
  }.bind(this));
}

Adapter.prototype.init = function(){
  socket = nano.socket('req');
  socket.on('message', function(){
    req.connect(addr);
  });
}

Adapter.server = 'child';
module.exports = Adapter;
