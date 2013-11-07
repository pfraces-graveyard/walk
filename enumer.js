var lap = require('lap'),
  tof = require('tof');

module.exports = function (obj, callback) {
  var path = [],
    parents = [];

  var step = function (node, index) {
    if (parents.indexOf(node) >= 0) return;

    var is = tof(node);

    var stats = {
      node: node,
      index: index,
      parents: parents,
      path: path,
      root: obj,
      is: is
    };
    
    var next = function () {
      if (is.primitive()) return;

      parents.push(node);

      lap(node, function (item, index) {
        path.push(index);
        step(item, index);
        path.pop();
      });

      parents.pop();
    };

    callback(stats, next);
  };

  step(obj);
};
