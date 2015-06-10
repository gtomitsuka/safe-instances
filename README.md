# safe-instances (previously called `safe_children`)
[![Build Status](https://travis-ci.org/oratio-io/safe-instances.svg?branch=master)](https://travis-ci.org/oratio-io/safe-instances)
[![Downloads per month](https://img.shields.io/npm/dm/safe-instances.svg)](http://www.npmjs.com/package/safe-instances)
[![Join the chat at https://gitter.im/oratio-io/safe-instances](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/oratio-io/safe-instances?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A complete, functional, fast and simple Node.js threading module.

`safe-instances` was developed by Oratio.io for Oratio.js's Module System.
It's based on children pools, allowing you to

**NOTE:** With release 2.0, sending file names when doing `new Child()` is **DEPRECATED**. You must do `new ChildFile()`, as explained in the quick-start tutorial.

# Installation

`npm install safe-instances`

# Getting Started

``` javascript
var Child = require('safe-instances');
var pool = new Child.Pool(3); //Creates pool with 3 processes

var child = new Child('process.handle("randomMessage", function(value, callback){ callback(value) }', pool, 3 * 60);
child.start();

child.contact('randomMessage', 'myValue') //NOTE: You might pass a third callback argument, too.
.then(function(value){
  console.log(value); //<- "myValue"
});
```

Need to send file locations instead of strings when creating new script? Do:

``` javascript
var Child = require('safe-instances');
Child.File.usesCache = false; //Default: true. Caches scripts for being re-used.

var child = new Child.File(__dirname + 'script.js', 3 * 60);
child.start();
[...]
```

# API Documentation

## Child properties
### Child.Adapter
Adapter for child.

### Child.logs
Boolean. Default: `true`. If the `console.log`s running on the child process appear on the parent process, too.

### Child.allowsRequire
Boolean. Default: `false`. If `require()`s are allowed in the child process. Only accept this if the source is trustable.


## `new Child(code, pool, timeout)`

### Child#start()
Function for starting children.

### Child#timeout
Returns timeout passed on start. Can be changed, but only before `Child#start()` is called.

### Child#code
Returns code passed as the first argument. Can be changed, but only before `Child#start()` is called.

### Child#kill(signal)
Kills child process. A new process is automagically created by the pool.

### Child#contact(handler, message)
Return Promise.
Contacts child. Example:
``` javascript
// Parent
child.contact('database query', 'SELECT * FROM Table')
.then(function(rows){
  console.log(rows); //Yay! Did a query in a child process!
}).catch(function(error){
  console.error(error); //Query error.
});

//Child
process.handle('database query', function(argument){
  return pg.query(argument); //Can even be synchronous, we're on a child process.
});
```
Please note that if there's a fatal contact failure, an error will be actually thrown, so there's no need to handle `safe-instances` errors in the returned promise.

## `Child.File(location, pool, timeout)`
Shares API with `Child`. Getting Started guide already covers everything.
