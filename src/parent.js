/* Check LICENSE for details. Developed by Oratio.io */

//Node Standard Modules
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');

//NPM Modules
var Promise = require('bluebird');

//safe-instances Modules
var util = require('./util');

function Child(_code, _pool, _timeout){
  this.code = _code;
  this.pool = _pool;
  this.timeout = _timeout;
  this.process = this.pool.getProcess();
  this.adapter = new Child.Adapter(this);
}

module.exports = Child;
