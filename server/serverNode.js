const http = require('http');
// GET 
http.createServer((request, response) => {
 
console.log('server work 1005');
console.log(request.method);
console.log(request.host);
console.log(request.url);
response.sendfile('index.html');
}). listen(1005);