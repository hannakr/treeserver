var cuid = require('cuid');
var lib = require("../lib");

module.exports = function (treeId, treeString, callback) {
  console.log(treeString);
  lib.db.put(cuid.slug(), treeString, function(err) {
    if (err) {
      console.error('error putting treeData:', err);
      return callback(err);
    }
  });
  callback(null, { contentType: 'application/json', data: treeString });
}
