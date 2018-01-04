var assert = require('assert');
var lib = require("./lib");
var views = require("./views");

// Test that the URL is parsed correctly
var expected = lib.pathParse('test/this/url');
assert.deepEqual( expected, ['test','this','url'], 'URL not split into pieces as expected' );

// Test that objects are formatted correctly
var resultsObject = {
  keyString1: {firstValue: 'valueString11', secondValue: 'valueString12'},
  keyString2: {firstValue: 'valueString21', secondValue: 'valueString22'}
};

var returnObject = [
  { id: 'keyString1', firstValue: 'valueString11', secondValue: 'valueString12' },
  { id: 'keyString2', firstValue: 'valueString21', secondValue: 'valueString22' }
];

var expected = lib.formatResults(resultsObject);
assert.deepEqual( expected, returnObject, 'JSON is not converted from one format to another' );

// Test that an empty object is formatted correctly
resultsObject = {};
returnObject = [];

var expected = lib.formatResults(resultsObject);
assert.deepEqual( expected, returnObject, 'JSON formatter does not handle empty object' );

// Start testing the getOneTree function
// Test that a tree is returned correctly
var goodTreeId = '2w1nbjs';
var queryString = '';
// var callback = ;
returnObject = JSON.stringify({
    "results": [
        {
            "address": "3704 South Saratoga Rd",
            "commonName": "Cedar",
            "latinName": "Thuja",
            "id": "2w1nbjs"
        }
    ]
});

views.getOneTree(goodTreeId, queryString, function(err, result) {
  //console.log("i are special callback");
  //console.log(result.data);
  assert.deepEqual( result.data, returnObject, 'Did not retrieve single tree with ID 2w1nbjs');
});

// Test what happens when a tree is not found
var treeId = '2w1nbjf';
var queryString = '';
// var callback = ;
returnObject = JSON.stringify({
    "results": [
        {
            "address": "3704 South Saratoga Rd",
            "commonName": "Cedar",
            "latinName": "Thuja",
            "id": "2w1nbjs"
        }
    ]
});

views.getOneTree(treeId, queryString, function(err, result) {
  //console.log("i are special callback");
  //console.log(result);
//  console.log(err);
//  assert.throws( err, Error, 'retrieve one tree using its ID');
  assert.ok(err);
});
//console.log('all tests pass!');
