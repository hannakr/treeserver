var db = require('../lib/db');

module.exports = function (treeQuery, callback) {
  db.del(treeQuery.id, function(err) {
    if (err) {
      return callback(err);
    }
    else {
      callback(null, { contentType: 'text/html', data: 'tree deleted' });
    }
  });
}
