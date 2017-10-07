
module.exports = function (queryString) {
  var parsedObject = {};
  var keyValue = queryString.split('&');
  //console.log(keyValue);
  keyValue.forEach(function (pair) {
    var splitPair = pair.split('=');
    parsedObject[splitPair[0]] = splitPair[1].replace(/\+/g, ' ');
  });
  return parsedObject;
}
