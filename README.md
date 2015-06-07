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

```  javascript
Child.File.usesCache = false; //Default: true. Caches scripts for being re-used.

var child = new Child.File(__dirname + 'script.js', 3 * 60);

[...]
```

# Documentation

### [`new Child(code, pool, timeout)`](https://github.com/oratio-io/safe_children/blob/master/src/spawner.js#L9)
Returns new Child object with following properties:

* child.setPool(pool); Sets child's pool to pool.
* child.encoding - Default: `utf8`.
* child.commandType - Default: `node`.
* child.timeout - The timeout you set when creating a child - defaults to 1 minute. Only works before beginning the script.
* child.logs - Do `console.log`s from the child appear on your console?
* child.contact(event, message) - Returns `Promise`. Should be handled with `process.handle` in the child process.
