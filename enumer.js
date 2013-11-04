module.exports = function (obj, callback) {
  var path = [];

  var step = function (node) {
    var index;
    
    if (path.length) {
      index = path[path.length - 1];
    }
    
    var stats = {
      node: node,
      path: path,
      index: index,
      root: obj
    };
    
    var next = function () {
      for (prop in node) {
        path.push(prop);
        step(node[prop]);
        path.pop();
      }
    };

    callback(stats, next);
  };

  step(obj);
};
