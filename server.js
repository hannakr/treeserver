var http = require('http');
var fs = require('fs');
var url = require('url');
var cuid = require('cuid');

var views = require("./views");
var lib = require("./lib");

var routes = { '/api/parsetime': views.parsetime,
  '/api/unixtime': views.unixtime,
  '/api/trees': views.trees,
  '/api/newtree': views.newtree,
  '/api/deltree': views.deltree,
  '/api/addtree': views.addtree,
  '/api/delete': views.delete };

var server = http.createServer(function (req, res) {
  if (req.method == 'GET') {
    console.log(url.parse(req.url).pathname);
    console.log(routes[url.parse(req.url).pathname])
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
    console.log(url.parse(req.url).pathname);
    console.log(routes[url.parse(req.url).pathname])
    var routeQuery = url.parse(req.url, true).query;
    var routeFunction = routes[url.parse(req.url).pathname];
    var treeString = '';
    req.setEncoding('utf8');
    req.on('data', function (data) {
      treeString += data;
    });
    req.on('end', function () {
      routeFunction(routeQuery, treeString, function(err, answer) {
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
      // treeData = lib.queryParse(treeString);
      // console.log(treeData);
      // lib.db.put(cuid.slug(), treeData, function(err) {
      //   if (err) {
      //     console.error('error putting treeData:', err);
      //   }
      // });
      // console.log(JSON.parse(treeData));
      //res.end();
      // var options = {
      //   port: 3000,
      //   path: 'api/trees'
      // };
      // http.get(options, function(res) {
      //   console.log("Got response: " + res.statusCode);
      // }).on('error', function(e) {
      //   console.log("Got error: " + e.message);
      // });
    //});
  //}
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    res.end();
  });
});
server.listen(Number(3000));
console.log('server running on port 3000\n');
