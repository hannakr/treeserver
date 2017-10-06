
module.exports = function (data, callback) {
  var date = new Date();
  var returnDate = { hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds() };
  callback(null, { contentType: 'application/json', data: JSON.stringify(returnDate) });
}
