'use strict';

var express = require('express');

var routes = require("./router/index");
var apis = require("./api/apis")
var hbs = require("express-handlebars");
var app = express();


app.use('/public', express.static(process.cwd() + '/public'));
app.engine("hbs",hbs({extname:"hbs",defaultLayout:"layout",layoutsDir:__dirname+"/views/layouts/"}));
app.set("views",process.cwd()+"/views");
app.set("view engine","hbs");

app.use("/", routes);
app.use("/api",apis);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
