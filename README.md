# enumer

Recursive object enumeration

# usage

```js
var enumer = require('enumer');

enumer([1,2,3]).each(function (node) {
  console.log(node);
});
```

    [ 1, 2, 3 ]
    1
    2
    3

```js
var enumer = require('enumer');

enumer({ a: 1, b: 2, c: 3 }).each(function (node, stats) {
  console.log(stats.index, node);
});
```

    undefined { a: 1, b: 2, c: 3 }
    a 1
    b 2
    c 3
