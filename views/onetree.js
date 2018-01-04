var lib = require('../lib');

var oneTree = function(treeId, queryString, callback) {
  lib.db.get(treeId, function(err, value) {
    if (err) {
      return callback(err);
    }
    var singleTree = {};
    singleTree[treeId] = JSON.parse(value);
    var prettyResults = {};
    prettyResults.results = lib.formatResults(singleTree);
    callback(null, { contentType: 'application/json', data: JSON.stringify(prettyResults) });
  });
}

module.exports = {
  oneTree: oneTree
};
