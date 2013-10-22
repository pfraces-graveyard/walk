var isit = require('isit');

module.exports = function (obj, callback) {
  var step = function (stats) {
    var node = stats.node,
      is = isit(node),
      tree = stats.tree || [],
      path = stats.path  || [],
      parent;

    if (path.length) parent = path[path.length - 1];

    stats.is = is;
    stats.path = path;
    stats.tree = tree;
    stats.parent = parent;

    var next = function () {
      if (is.object || is.array || is.func) {
        tree.push(node);

        for (prop in node) {
          path.push(prop);

          step({
            node: node[prop],
            index: prop,
            tree: tree,
            path: path
          });

          path.pop();
        }

        tree.pop();
      }
    };

    callback(stats, next);
  };

  step({ node: obj });
};
