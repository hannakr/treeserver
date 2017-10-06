
module.exports = function (data, callback) {
  response = "<html><head><title>Make a new tree!</title></head>" +
    "<body><form action=\"/api/trees\" method=\"post\">" +
    "<div><label for=\"address\">Address </label>" +
    "<input name=\"address\" id=\"address\" value=\"\">" +
    "</div> <div>" +
    "<label for=\"commonName\">CommonName </label>" +
    "<input name=\"commonName\" value=\"\">" +
    "</div> <div>" +
    "<label for=\"latinName\">LatinName </label>" +
    "<input name=\"latinName\" value=\"\">" +
    "</div> <div>" +
    "<button>Add tree</button>" +
    "</div></form></body></html>";
  callback(null, { contentType: 'text/html', data: response });
}
