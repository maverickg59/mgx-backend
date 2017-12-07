const express = require('express');
const app = express();
const upload = require('express-fileupload');
const http = require('http').Server(app).listen(2990)

app.use(upload());

console.log('server started!')

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', function(req, res) {
    if(req.files) {
      console.log(req.files)
    }
});
