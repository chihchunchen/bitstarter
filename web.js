var express = require('express');

app = express.createServer(express.logger());

app.get('/', function(request, response) {
var fs = require('fs');
  var buf = fs.readFileSync("index.html");
  
print(buf.toString());
  response.send(buf.toString("utf-8"));
});
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
