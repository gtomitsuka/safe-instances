# safe_children

[![Join the chat at https://gitter.im/oratio-io/safe-instances](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/oratio-io/safe-instances?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Run non-safe JS safely.

`safe_children` was developed by Oratio.io for Oratio.js's Module System.

# Installation

`npm install safe_children`

# Getting Started

``` javascript
var Child = require('safe_children')

var child = new Child('otherFile.js', 3 * 60); //Run otherFile.js and kill it after 3 minutes
child.loadScript()
  .then(child.spawn.bind(child)); //See http://stackoverflow.com/questions/29756238/javascript-this-doesnt-work-when-calling-promises-instead-of-function
//OR
var child = new Child("var chocolates = [{name: 'M&M's'}]; console.log(chocolates.count)", 3 * 60, false);
child.spawn();
//You can also pass strings to run as children. Needs false as third argument.
```

# Documentation

[`new Child(locationOrCode, timeout, isFile, encoding, commandType)`](https://github.com/oratio-io/safe_children/blob/master/src/spawner.js#L8)
