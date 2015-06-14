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
  this.address = 'ipc://safe-instances.local/id/' + util.getRandomInt(1, 999999);
  this.params = {address: this.address};

  this.socket.on('message', function(_result){
    var result = JSON.stringify(_result.toString())
    this.callbacks[result.id](result.message);
  }.bind(this));
}

Adapter.prototype.init = function(){
  this.socket.bind(this.address);
}

Adapter.prototype.contact = function(handler, message){
  return new Promise(function(resolve, reject){
    var id = util.getRandomInt(1, 999999);
    var block = {type: 'contact', value: message, handler: handler, id: id};

    function callbackFunction(value){
      resolve(value);

      this.callbacks[id] = null;
    }.bind(this)

    this.callbacks[id] = callbackFunction;
    this.socket.send(block);
  }.bind(this));
}

Adapter.location = __dirname + '/child.js';
console.log(Adapter.location);

module.exports = Adapter;
