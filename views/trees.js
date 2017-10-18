var cuid = require('cuid');
var db = require('../lib/db');

module.exports = function (treeId, callback) {
  console.log(treeId);
  if (treeId) {
    db.get(treeId, function(err, value) {
      if (err) {
        return callback(err);
      }
      var printTree = {};
      printTree[treeId] = JSON.parse(value);
      callback(null, { contentType: 'application/json', data: JSON.stringify(printTree) });
    });
  }
  else {
    var stream = db.createReadStream();
    var allTrees = {};
    stream.on('data', function(data) {
      console.log('%s = %j', data.key, data.value);
      allTrees[data.key] = JSON.parse(data.value);
    });
    stream.once('end', function() {
      callback(null, { contentType: 'application/json', data: JSON.stringify(allTrees) });
    });
    stream.once('error', function(err) {
      console.error('stream emitted error:', err);
      return callback(err);
    });
  }
}
