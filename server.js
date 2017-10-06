var http = require('http');
var fs = require('fs');
var url = require('url');

var views = require("./views");
var lib = require("./lib");

var routes = { '/api/parsetime': views.parsetime,
  '/api/unixtime': views.unixtime,
  '/api/trees': views.trees,
  '/api/newtree': views.newtree };

var server = http.createServer(function (req, res) {
  if (req.method == 'GET') {
    console.log(url.parse(req.url).pathname);
    console.log(routes[url.parse(req.url).pathname])
    // try {
    //   var answer = routes[url.parse(req.url).pathname](url.parse(req.url, true).query);
    //   //res.writeHead(200, { 'Content-Type': 'application/json' });
    //   res.writeHead(200, { 'Content-Type': answer.contentType });
    //   res.end(answer.data);
    // }
    // catch (e) {
    //   console.log(e);
    //   res.statusCode = 404;
    //   res.end();
    // }
    var routeQuery = url.parse(req.url, true).query;
    var routeFunction = routes[url.parse(req.url).pathname];
    routeFunction(routeQuery, function(err, answer) {
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
  else if (req.method == 'POST') {
    var treeString = '';
    req.setEncoding('utf8');
    req.on('data', function (data) {
      treeString += data;
    });
    req.on('end', function () {
      treeData = lib.queryParse(treeString);
      console.log(treeData);
      console.log(JSON.parse(treeData));
      res.end();
    });
  }
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    res.end();
  });
});
server.listen(Number(3000));
console.log('server running on port 3000\n');
