/* by Oratio.io */

//Modules
var vm = require('vm');
var assert = require('assert');

var file = process.argv[2];
var timeout = parseInt(process.argv[3], 10);

vm.runInThisContext(file, {timeout: timeout});
