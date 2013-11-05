module.exports = function (obj, callback) {
  var path = [];

  var step = function (node, index, parent) {
    var stats = {
      node: node,
      index: index,
      parent: parent,
      path: path,
      root: obj
    };
    
    var next = function () {
      for (prop in node) {
        path.push(prop);
        step(node[prop], prop, node);
        path.pop();
      }
    };

    callback(stats, next);
  };

  step(obj);
};
