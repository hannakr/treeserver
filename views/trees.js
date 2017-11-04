var cuid = require('cuid');
var lib = require('../lib');
//var formatResults = require('../lib/formatresults');

module.exports = function (treeId, callback) {
  console.log(treeId);
  if (treeId) {
    lib.db.get(treeId, function(err, value) {
      if (err) {
        return callback(err);
      }
      var singleTree = {};
      singleTree[treeId] = JSON.parse(value);
      var prettyResults = new Object();
      prettyResults.results = lib.formatResults(singleTree);
      callback(null, { contentType: 'application/json', data: JSON.stringify(prettyResults) });
    });
  }
  else {
    var stream = lib.db.createReadStream();
    var allTrees = {};
    stream.on('data', function(data) {
      console.log('%s = %j', data.key, data.value);
      allTrees[data.key] = JSON.parse(data.value);
    });
    stream.once('end', function() {
      var prettyResults = new Object();
      prettyResults.results = lib.formatResults(allTrees);
      console.log(prettyResults);
      callback(null, { contentType: 'application/json', data: JSON.stringify(prettyResults) });
    });
    stream.once('error', function(err) {
      console.error('stream emitted error:', err);
      return callback(err);
    });
  }
}
