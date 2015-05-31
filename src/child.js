/* Check LICENSE for details. Developed by Oratio.io */

//Node.js Standard Modules
var vm = require('vm');

//Global Variables
var _handlers = {};

global.process.handle = function(message, callback){
  _handlers[message] = callback;
}


process.on('message', function(message){
  if(message.type === 'code'){
    vm.runInThisContext(message.code, {timeout: message.timeout});
    return;
  }

  if(message.type === 'message'){
    function callbackHandler(returnedMessage){
      process.send({type: 'callback', event: message.event, id: message.id, message: returnedMessage});
    }

    return _handlers[message.event](param, callbackHandler);
  }

  throw new Error('This kind of message isn\'t currently accepted.')
})
