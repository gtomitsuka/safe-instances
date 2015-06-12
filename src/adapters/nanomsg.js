// nanomsg Adapter
var nano = require('nanomsg');
var Promise = require('bluebird');

var server;

function Adapter(child){
  this.child = child;
  this.callbacks = {};

  this.child.process.on('message', function(result){
    this.callbacks[result.id](result.message);
  }.bind(this));
}
