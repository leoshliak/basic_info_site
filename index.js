const http = require('http');
const fs = require('fs');
const url = require('url');

const routes = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact-me': 'contact-me.html'
};

http.createServer((req, res) => {
  const pathname = url.parse(req.url, true).pathname;
  const filename = routes[pathname] || '404.html';

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Internal Server Error');
    }
    res.writeHead(filename === '404.html' ? 404 : 200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(8080);
