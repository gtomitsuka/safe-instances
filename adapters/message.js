/* Check LICENSE for details. Developed by Oratio.io */

/* Adapter: Inter-process Messages
   Description: Uses default, built-in child_process messages. */

function Adapter(child){
  this.child = child;
}

Adapter.prototype.init = function(){};

Adapter.prototype.contactChild = function(){

}

Adapter.prototype.messageHandler = function(){ //Handles messages in child process

}.toString();

module.exports = Adapter;
