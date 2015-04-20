/* by Oratio.io */

//Modules
var vm = require('vm');
var assert = require('assert');

var file = process.argv[2];
var timeout = new Date(process.argv[3]);

vm.runInNewContext(file, {})//,{timeout: timeout});
