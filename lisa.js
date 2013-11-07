var ich = require('ich');

module.exports = function (obj, callback) {
  var path = [],
    parents = [];

  var step = function (node, index) {
    if (parents.indexOf(node) >= 0) return;

    var stats = {
      node: node,
      index: index,
      parents: parents,
      path: path,
      root: obj
    };
    
    var next = function () {
      parents.push(node);

      ich(node, function (item, index) {
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
