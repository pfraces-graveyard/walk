# enumer

Recursive object enumeration

# Usage

```js
var enumer = require('enumer');

enumer({ a: 1, b: 2, c: 3 }, function (stats, next) {
  console.log(stats.index, stats.node);
  next();
});
```

    undefined { a: 1, b: 2, c: 3 }
    a 1
    b 2
    c 3

```js
var enumer = require('enumer');

enumer([1,2,3], function (stats, next) {
  console.log(stats.node);
  setTimeout(next, 0);
});
```

    [ 1, 2, 3 ]
    1
    2
    3

```js
var enumer = require('enumer'),
  itis = require('isit');

var obj = {
  a: 1,
  b: {
    x: 11,
    y: [ 111, 112 ],
    z: 12
  },
  c: 2
};

enumer(obj, function (stats, next) {
  var is = itis(stats.node);

  if (is.number) {
    console.log(stats.node);
  }

  if (!is.array) {
    next();
  };
});
```

    1
    11
    12
    2

# Install

    npm install enumer

# Motivation

Versatile object enumeration, simpler than [traverse][1]

[1]: https://github.com/substack/traverse
