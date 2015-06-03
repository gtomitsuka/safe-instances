//Mocha Tests
var Child = require('../index');
var assert = require('assert');
var fs = require('fs');
var child_process = require('child_process');

var processString = fs.readFileSync(__dirname + '/../sample-child.js', 'utf8');
var unicodeString = 'По оживлённым берегам ♖	♘	♗	♕	♔	♗	♘	♖ άντʼ ἂν ἐξήκοι σα';

Child.allowsRequire = true;

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
  });

  it('communicates with child successfully', function(done){
    child.contact('parentMessage')
    .then(function(){
      done();
    });
  });

  it('returns message passed by parent', function(done){
    child.contact('parentMessage', 'TME-VALUE')
    .then(function(value){
      assert.equal('TME-VALUE', value);
      done();
    });
  });

  it('performs math on child process', function(done){
    child.contact('minimalValue', [1, 3, 665, 55 * 15, 24, 333])
    .then(function(value){
      assert.equal(1, value);
      done();
    });
  });

  it('works with timeouts on child process, too', function(done){
    child.contact('timeoutedMessage')
    .then(function(value){
      done();
    });
  });

  it('works with Unicode characters', function(done){
    child.contact('parentMessage', unicodeString)
    .then(function(value){
      assert.equal(unicodeString, value);
      done();
    });
  });
})

describe('Pool#killAll', function(){
  it('kills all processes when done', function(){
    global.pool.killAll();
  })
})
