//var db = require('../lib/db');
var lib = require("../lib");

module.exports = function (treeQuery, treeString, callback) {
  //treeData is a JSON object
  treeData = lib.queryParse(treeString);
  console.log(treeString)
  console.log(treeData);
  lib.db.del(treeData.treeid, function(err) {
    if (err) {
      return callback(err);
    }
    else {
      callback(null, { contentType: 'text/html', data: 'tree deleted' });
    }
  });
}
