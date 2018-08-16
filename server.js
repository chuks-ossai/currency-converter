const http = require('http');
const url = require('url');

const host = 'localhost';
const port = 8080;

const page = url.parse(req.url).pathname;
console.log(page);
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end();
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});

