module.exports = function (obj, callback) {
  var path = [];

  var step = function (node) {
    var next = function () {
      for (prop in node) {
        path.push(prop);
        step(node[prop]);
        path.pop();
      }
    };

    var stats = {
      node: node,
      path: path,
      index: path[path.length - 1],
      root: obj
    };

    callback(stats, next);
  };

  step(obj);
};
