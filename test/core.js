//Mocha Tests
var Child = require('../index');
var assert = require('assert');
var child_process = require('child_process');

var processString = 'process.handle(\'parentMessage\', function(value, callback){callback(value)});';

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

  it('spawns child', function(){
    child = new Child(processString, pool);
    child.start();
  })

  it('communicates with child successfully', function(done){
    child.contact('parentMessage', 'myValue')
    .then(function(value){
      assert.equal(value, 'myValue');
      done();
    });
  })
})

describe('Pool#killAll', function(){
  it('kills all processes when done', function(){
    global.pool.killAll();
  })
})
