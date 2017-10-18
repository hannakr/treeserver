var cuid = require('cuid');
var lib = require("../lib");

module.exports = function (treeQuery, treeString, callback) {
  //treeData is a JSON object
  console.log(treeString);
  treeData = lib.queryParse(treeString);
  console.log(treeData);
  lib.db.put(cuid.slug(), JSON.stringify(treeData), function(err) {
    if (err) {
      console.error('error putting treeData:', err);
      return callback(err);
    }
  });
  //console.log(JSON.parse(treeData));
  callback(null, { contentType: 'application/json', data: JSON.stringify(treeData) });
}
