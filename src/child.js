/* by Oratio.io */

//Modules
var vm = require('vm');
var assert = require('assert');

var file = process.argv[2];
var timeout = new Date(process.argv[3]);
console.log(file);
vm.runInThisContext(file, {timeout: timeout});
