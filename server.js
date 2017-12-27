'use strict';

var express = require('express');
const fileUpload = require('express-fileupload');
var routes = require("./router/index");
var hbs = require("express-handlebars");
var app = express();


app.use('/public', express.static(process.cwd() + '/public'));
app.engine("hbs",hbs({extname:"hbs",defaultLayout:"layout",layoutsDir:__dirname+"/views/layouts/"}));
app.set("views",process.cwd()+"/views");
app.set("view engine","hbs");


app.use(fileUpload());
app.post("/upload",function(req,res){

  if (!req.files.file)
    return res.status(400).send('No files were uploaded.');
  else{
    res.json({"size": Buffer.byteLength(req.files.file.data)})
  }
  

});
app.use("/", routes);



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
