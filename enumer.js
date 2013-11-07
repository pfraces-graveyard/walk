module.exports = function (obj, callback) {
  var path = [],
    parents = [];

  var step = function (node, index, parent) {
    if (parents.indexOf(node) >= 0) return;

    var stats = {
      node: node,
      index: index,
      parent: parent,
      parents: parents,
      path: path,
      root: obj
    };
    
    var next = function () {
      parents.push(node);

      for (prop in node) {
        path.push(prop);
        step(node[prop], prop, node);
        path.pop();
      }

      parents.pop();
    };

    callback(stats, next);
  };

  step(obj);
};
