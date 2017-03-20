var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');


const PORT  = process.env.PORT || 3000;


app.use(bodyParser.json());

app.get('/', function(req, res, next) {

   res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.post('/' ,multer({dest: './uploads/'}).single('upload'), function(req , res) {
  // console.log(req.body); //form fields
  // console.log(req.file);
  let result = {
    name: req.file.originalname,
    size: req.file.size,
    file: req.file.filename
  }
  // fs.unlink deletes the file after the upload
  fs.unlink('./uploads/'+result.file , function(err) {
    if (err) throw err;
  
  });
  res.json(result);
} )
app.listen(PORT, function() {
  console.log('server is up on port ' + PORT);
});
