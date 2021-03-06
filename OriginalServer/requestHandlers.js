var querystring = require("querystring");
var fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  fs.readFile("./client/index.html",function(err,body){
      if(err){
          throw err;
      }
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(body);
      response.end();
  });
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;