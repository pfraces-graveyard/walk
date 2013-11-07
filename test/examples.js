var enumer = require('../enumer');

enumer([1,2,3], function (stats, next) {
  console.log(stats.node);
  next();
});

enumer('abc', function (stats, next) {
  console.log(stats.node);
  next();
});
