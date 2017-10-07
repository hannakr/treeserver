
module.exports = function (data, callback) {
  response = "<html><head><title>Delete a tree</title></head>" +
    "<body><form action=\"/api/deltree\" method=\"post\">" +
    "<div><label for=\"treeid\">ID </label>" +
    "<input name=\"treeid\" id=\"treeid\" value=\"\">" +
    "</div> <div>" +
    "<button>Delete tree</button>" +
    "</div></form></body></html>";
  callback(null, { contentType: 'text/html', data: response });
}
