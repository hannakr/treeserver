var cuid = require('cuid');
var db = require('../lib/db');

var treeDB = {
  '1': { address: '256 East 2nd Ave', commonName: 'Maple', latinName: 'Acer' },
  '2': { address: '520 East 1st Ave', commonName: 'Ash', latinName: 'Fraxinus' },
  '3': { address: '189 Keefer St', commonName: 'Cherry', latinName: 'Prunus' }
};

module.exports = function (treeQuery, callback) {
  console.log(treeQuery);
  if (Object.keys(treeQuery).length) {
    db.get(treeQuery.id, function(err, value) {
      if (err) {
        return callback(err);
      }
      var printTree = {};
      printTree[treeQuery.id] = value;
      callback(null, { contentType: 'application/json', data: JSON.stringify(value) });
    });
    // if (treeDB[treeQuery.id]) {
    //   var printTree = treeDB[treeQuery.id];
    //   printTree.cid = cuid.slug();
    //   callback(null, { contentType: 'application/json', data: JSON.stringify(printTree) });
    // }
    // else {
    //   return callback ('tree not found');
    // }
  }
  else {
    var stream = db.createReadStream();
    var allTrees = {};
    stream.on('data', function(data) {
      console.log('%s = %j', data.key, data.value);
      allTrees[data.key] = data.value;
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
