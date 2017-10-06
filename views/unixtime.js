
module.exports = function (data, callback) {
  var date = new Date();
  var returnDate = { unixtime: date.valueOf() };
  callback(null, { contentType: 'application/json', data: JSON.stringify(returnDate) });
}
