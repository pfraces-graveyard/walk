# walk

Object traversal

# Usage

```js
var walk = require('u.walk');

walk({ a: 1, b: 2, c: 3 }, function (stats, next) {
  console.log(stats.index, stats.node);
  next();
});
```

    undefined { a: 1, b: 2, c: 3 }
    a 1
    b 2
    c 3

```js
var walk = require('u.walk');

walk([1,2,3], function (stats, next) {
  console.log(stats.node);
  setTimeout(next, 0);
});
```

    [ 1, 2, 3 ]
    1
    2
    3

```js
var walk = require('u.walk'),
  is = require('u.is');

var obj = {
  a: 1,
  b: {
    x: 11,
    y: [ 111, 112 ],
    z: 12
  },
  c: 2
};

walk(obj, function (stats, next) {
  var node = stats.node;

  if (is.number(node)) {
    console.log(node);
  }

  if (!is.array(node)) {
    next();
  };
});
```

    1
    11
    12
    2

# Install

    npm install u.walk

# Motivation

Straightforward object traversal

# Alternatives

*   [traverse][1]

[1]: https://github.com/substack/traverse
