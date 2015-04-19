/* by Oratio.io */

//Modules
var vm = require('vm');
var assert = require('assert');

var filename = process.argv[2] || 'file.js';
var file = process.argv[3];
var timeout = process.argv[4];

vm.runInThisContext(file, {filename: filename, timeout: 60 * 60}); //Runs for an hour, LOL.
