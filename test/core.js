//Mocha Tests
var Child = require('../index');
var assert = require('assert');
var child_process = require('child_process');

describe('Pool', function(){
  it('starts successfully', function(){
    global.pool = new Child.Pool(2);
  });

  it('gives a process when available', function(){
    assert(pool.getProcess().constructor, 'ChildProcess');
  });
})

describe('Child', function(){
  var child;

  //it('')
})
