var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(1005, function(){
  console.log('listening on *:1005');
});