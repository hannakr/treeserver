var cuid = require('cuid');
var lib = require("../lib");

module.exports = function (treeId, treeString, callback) {
  var newId = cuid.slug();
  lib.db.put(newId, treeString, function(err) {
    if (err) {
      console.error('error putting treeString:', err);
      return callback(err);
    }
    var treeData = {};
    treeData[newId] = JSON.parse(treeString);
    var prettyResults = new Object();
    prettyResults.results = lib.formatResults(treeData);
    callback(null, { contentType: 'application/json', data: JSON.stringify(prettyResults) });
  });
}
