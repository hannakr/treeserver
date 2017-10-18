//var db = require('../lib/db');
var lib = require("../lib");

module.exports = function (treeId, callback) {
  //treeData is a JSON object
  //treeData = lib.queryParse(treeString);
  console.log(treeId)
  lib.db.del(treeId, function(err) {
    if (err) {
      return callback(err);
    }
    else {
      callback(null, { contentType: 'text/html', data: 'tree deleted' });
    }
  });
}
