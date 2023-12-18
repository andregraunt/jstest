const app = require('express')();
const http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(1004, function(){
  console.log('listening on *:1004');
});