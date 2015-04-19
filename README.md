# safe_children
Run non-safe JS safely.

`safe_children` was developed by Oratio.io for Oratio.js's Module System.

# Getting Started

``` javascript
var Child = require('safe_children')

var child = new Child('otherFile.js', 3 * 60); //Run otherFile.js and kill it after 3 minutes
//OR
var child = new Child('var chocolates = []; chocolates.push({name: "M&M's"}); console.log(chocolates.count);', 3 * 60);
//You can also pass strings to run as children
```
