var cuid = require('cuid');
var lib = require('../lib');
//var oneTree = require('./onetree');
//var formatResults = require('../lib/formatresults');

var trees = function (treeId, queryString, callback) {
  if (treeId) {
    getOneTree(treeId, queryString, callback);
  }
  else if (Object.keys(queryString).length !== 0) {
    searchTrees(treeId, queryString, callback);
  }
  else {
    getAllTrees(treeId, queryString, callback);
  }
}

var getOneTree = function(treeId, queryString, callback) {
  //console.log("start test");
  lib.db.get(treeId, function(err, value) {
    //console.log("talk to db");
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

var searchTrees = function(treeId, queryString, callback) {
  var searchField = Object.keys(queryString)[0];
  var searchTerm = queryString[searchField];
  var stream = lib.db.createReadStream();
  var treeResults = {};
  stream.on('data', function(data) {
    if (JSON.parse(data.value)[searchField].toLowerCase() == searchTerm.toLowerCase()) {
      treeResults[data.key] = JSON.parse(data.value);
    }
  });
  stream.once('end', function() {
    var prettyResults = {};
    prettyResults.results = lib.formatResults(treeResults);
    callback(null, { contentType: 'application/json', data: JSON.stringify(prettyResults) });
  });
  stream.once('error', function(err) {
    console.error('stream emitted error:', err);
    return callback(err);
  });
}

var getAllTrees = function(treeId, queryString, callback) {
  var stream = lib.db.createReadStream();
  var allTrees = {};
  stream.on('data', function(data) {
    console.log('%s = %j', data.key, data.value);
    allTrees[data.key] = JSON.parse(data.value);
  });
  stream.once('end', function() {
    var prettyResults = {};
    prettyResults.results = lib.formatResults(allTrees);
    callback(null, { contentType: 'application/json', data: JSON.stringify(prettyResults) });
  });
  stream.once('error', function(err) {
    console.error('stream emitted error:', err);
    return callback(err);
  });
}

module.exports = {
  trees: trees,
  getOneTree: getOneTree,
  searchTrees: searchTrees,
  getAllTrees: getAllTrees
};
