var it = require('it');

var Enumer = function (obj) {
  this.root = obj;
};

var enumer = function (callback, filter) {
  var step = function (node, stats) {
    var is = it(node).is,
      stats = stats || {},
      path = stats.path  || [],
      parent;

    if (path.length) parent = path[path.length - 1];

    stats.is = is;
    stats.path = path;
    stats.parent = parent;

    (filter && !filter(node, stats)) return;

    callback(node, stats);

    if (is.object || is.array || is.func) {
      path.push(node);

      for (prop in node) {
        step(node[prop], {
          index: prop,
          path: path
        });
      }

      path.pop();
    }
  };

  return step;
};

Enumer.prototype.each = function (callback) {
  enumer(callback)(this.root);
};

Enumer.prototype.filter = function (filter) {
  var filtered;

  var builder = function (node, stats) {
    var path = stats.path,
      is = stats.is,
      curr,
      acc;

    if (!path.length) {
      if (is.object) filtered = {};
      else if (is.array) filtered = [];
      else if (is.function) filtered = node.bind();
      else filtered = node;
      return;
    }

    acc = filtered;

    for (var i = 0, l = path.length; i < l; i++) {
      curr = path[i];

      if (i < l - 1) acc = acc[curr];
      else {
        if (is.object) acc[curr] = {};
        else if (is.array) acc[curr] = [];
        else if (is.function) acc[curr] = node.bind();
        else acc[curr] = node;
      }
    }
  };

  enumer(builder, filter)(this.root);

  this.root = filtered;
  return this;
};

module.exports = function (obj) {
  return new Enumer(obj);
};
