var http = require('http');
var url = require('url');
var fs = require('fs');

const pages = ["index", "about", "contact"];

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  let filename
  if (q.pathname == "/") {
    filename = "./index.html";
  }
   else if (!pages.includes(q.pathname.substring(1))) {
   filename = "./404.html";
   }
  else {
    filename = "." + q.pathname + ".html";  
  }
  fs.readFile(filename, function(err, data) {
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);