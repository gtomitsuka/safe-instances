# safe_children
A complete, functional, fast and simple Node.js child processing module.

`safe_children` was developed by Oratio.io for Oratio.js's Module System.
It supports one unique thing: Children pools. For not creating too many child processes, you can specify a children pool and use them for your child processes. You might even use this for multi-threading.

**NOTE:** With release 2.0, sending file names when doing `new Child()` is **DEPRECATED**. You must do `new ChildFile()`, as explained in the quick-start tutorial.

# Installation

`npm install safe_children`

# Getting Started

``` javascript
var ChildPool = require('safe_children').Pool;
var pool = new ChildPool(10); //Limit to 10 concurrent child processes.

var child = new Child('process.handle("randomMessage", function(value, callback){ callback(value) }', 3 * 60);
child.setPool(pool);
child.start(); //Use .start() when using pools.

child.contact('randomMessage', 'myValue') //NOTE: You might pass a third callback argument, too.
.then(function(value){
  console.log(value); //<- "myValue"
});
```

Need to send file names instead of direct scripts when creating new script? Do:

``` javascript
var ChildFile = require('safe_children').File;
ChildFile.usesCache = false; //Default: true. If you don't want scripts to be cached, set this property to false.

var child = new ChildFile(__dirname + 'script.js', 3 * 60);

[...]
```

# Documentation

### [`new Child(code, timeout)`](https://github.com/oratio-io/safe_children/blob/master/src/spawner.js#L9)
Returns new Child object with following properties:

* child.start(); - Returns child's PID.
* child.setPool(pool); Sets child's pool to pool. See Pooling for more details.
* child.encoding - Default: `utf8`.
* child.commandType - Default: `node`. Need `iojs` or `nodejs` instead? Set this property to the command type needed if that's the case.
* child.timeout - The timeout you set when creating a child - defaults to 6 minutes. Feel free to change this property - but only before beginning the script.
* child.logs - Do `console.log`s from the child appear on your console? Your choice.
* child.contact(event, message) - Returns `Promise`. Should be handled with `process.handle` in the child process.

(Yes, there are a few more properties that aren't there for being messed up, but you can find them on the source.)
