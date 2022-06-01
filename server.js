const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  //const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  const extname = path.extname(filePath);
  const contentType = 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    } else {
      //res.writeHead(200, { 'Content-Type': contentType });
      //res.end(content, 'utf-8');
      res.end(content);
    }
  });
}).listen(5000);