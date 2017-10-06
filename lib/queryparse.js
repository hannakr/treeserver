
module.exports = function (queryString) {
  var parsedString = '{ ';
  var keyValue = queryString.split('&');
  //console.log(keyValue);
  keyValue.forEach(function (pair) {
    var splitPair = pair.split('=');
    parsedString += '\"' + splitPair[0] + '\": \"' + splitPair[1].replace(/\+/g, ' ') + '\", ';
  });
  parsedString = parsedString.slice(0, -2);
  parsedString += ' }';
  return parsedString;
}
