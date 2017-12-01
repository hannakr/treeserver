
module.exports = function (resultsObject) {
  //console.log(typeof resultsObject);
  var resultsKeys = Object.keys(resultsObject);
  var returnObject = resultsKeys.map(function(elem) {
    resultsObject[elem].id = elem;
    return resultsObject[elem];
  });
  return returnObject;
}
