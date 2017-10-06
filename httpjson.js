var http = require('http');
var fs = require('fs');
var url = require('url');

var parsetime = require('./parsetime.js');

//var routes = { '/api/parsetime': }

var server = http.createServer(function (req, res) {
  if (req.method == 'GET' && url.parse(req.url).pathname == '/api/parsetime') {
    var answer = parsetime();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(answer));
  }
  else if (req.method == 'GET' && url.parse(req.url).pathname == '/api/unixtime') {
    var date = new Date();
    var returnDate = { unixtime: date.valueOf() };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(returnDate));
  }
  else {
    res.end('please send a GET!\n');
  }
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    res.end();
  });
});
server.listen(Number(3000));
console.log('server running on port 3000\n');
