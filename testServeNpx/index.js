const express = require('express');

const app = express();

console.log('Hello World');
/*
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

*/
/*
app.get('/', function(req, res) {
  res.send('Hello Express');
});
*/
app.use('/public', express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  const filePath = __dirname + '/views/index.html';
  console.log(filePath);
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log('server started');
});