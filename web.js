var express = require("express");
var fs = require("fs");
var htmlfile = "index.html";
var app = express.createServer(express.logger());
var path = require("path");
var url = require("url");

app.get('/', function(request, response) {
  var uri = url.parse(request.url).pathname, filename = path.join(process.cwd(), uri);

  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 not found\n");
      response.end();
      return;
    }

    if(fs.statSync(filename).isDirectory()) filename += '/index.html';
    
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;

    }

    response.writeHead(200);
    response.write(file, "binary");
    response.end(); 
  });
});

})
app.use('/images', express.static(__dirname + "/images"));
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
