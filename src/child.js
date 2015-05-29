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
  }
})
