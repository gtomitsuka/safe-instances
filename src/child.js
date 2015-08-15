/* Check LICENSE for details. Developed by Oratio.io */

//Node.js Standard Modules
var vm = require('vm');

//Global Variables
var isReady = false;
var _handlers = {};

global.process.handle = function(message, callback){
  _handlers[message] = callback;
}

global.process.handle('__isReady', function(value, done){
  done(isReady);
});

process.on('message', function(message){
  if(message.type === 'init'){
    if(message.isSafe)
      global.require = require;

    vm.runInThisContext(message.code, {timeout: message.timeout, displayErrors: true});
    isReady = true;
    return;
  }

  if(message.type === 'contact'){
    function callbackHandler(returned){
      process.send({listener: message.listener, id: message.id, message: returned});
    }

    return _handlers[message.handler](message.value, callbackHandler);
  }

  throw new Error('This kind of message isn\'t currently accepted.')
})
