var http = require('http');
var fs = require('fs');
var url = require('url');
var cuid = require('cuid');

var views = require("./views");
var lib = require("./lib");

var routes = {
  'GET' : views.trees,
  'DELETE': views.deltree,
  'POST': views.addtree,
  'PUT': views.modtree
};

var server = http.createServer(function (req, res) {
  //respond to REST-style requests
  // /api/trees + GET = return all trees
  // /api/trees/# + GET = return the tree with id = #
  // /api/trees + POST = create a new tree with the data in the body
  // /api/trees/# + PUT = update the tree with id = # with the data in the body
  // /api/trees/# + DELETE = delete the tree with id = #

  // parse the url to make sure you're responding to the right one
  // parse the url to get the id
  var pathRequest = lib.pathParse(url.parse(req.url).pathname);
  console.log(pathRequest);
  if (pathRequest[1] == 'api' && pathRequest[2] == 'trees') {
    var treeId = pathRequest[3];
    // depending on the method, go to the relevant function
    if (req.method == 'GET' || req.method == 'DELETE') {
      console.log(url.parse(req.url).pathname);
      console.log(routes[url.parse(req.url).pathname])
      var routeQuery = url.parse(req.url, true).query;
      var routeFunction = routes[req.method];
      routeFunction(treeId, function(err, answer) {
        if (err) {
          // do error stuff
          console.log(err);
          res.statusCode = 404;
          res.end("File not found");
          return;
        }
        // do success stuff
        res.writeHead(200, { 'Content-Type': answer.contentType });
        res.end(answer.data);
      })
    }
    else if (req.method == 'POST' || req.method == 'PUT') {
      console.log(url.parse(req.url).pathname);
      console.log(routes[url.parse(req.url).pathname])
      var routeFunction = routes[req.method];
      var treeString = '';
      req.setEncoding('utf8');
      req.on('data', function (data) {
        treeString += data;
      });
      req.on('end', function () {
        routeFunction(treeId, treeString, function(err, answer) {
          if (err) {
            // do error stuff
            console.log(err);
            res.statusCode = 404;
            res.end("File not found");
            return;
          }
          // do success stuff
          res.writeHead(200, { 'Content-Type': answer.contentType });
          res.end(answer.data);
        });
      });
    }
  }
  else {
    res.statusCode = 404;
    res.end("File not found");
    return;
  }
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    res.end();
  });
});
server.listen(Number(3000));
console.log('server running on port 3000\n');
