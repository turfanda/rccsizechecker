/*
The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
It is not a statement, but a literal expression, ignored by earlier versions of JavaScript.
With strict mode, you can not, for example, use undeclared variables.

Strict mode makes it easier to write "secure" JavaScript.Strict mode changes previously accepted "bad syntax" into real errors.
As an example, in normal JavaScript, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable.
In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties.
In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will throw an error.

Strict mode makes several changes to normal JavaScript semantics. 
First, strict mode eliminates some JavaScript silent errors by changing them to throw errors. 
Second, strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode. 
Third, strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.

Strict mode is declared by adding "use strict"; to the beginning of a script or a function.

*/
'use strict';

var express = require('express');
var moment = require('moment');
var app = express();


/*kullandığın js,jpg yada css gibi static dosyaları kullancıya sunraken bu klasor altında sunuyor.aslında burada sytax şu şekilde express.static(root, [options]) 
ilk paramtere hangi directoryde olduğu bir bilgi girmezsen bunu root diye anlıyor ve buraya attığın tüm statik dosyaları public klasoru altında servis ediyor. buraya farklı bir directory girsen oradan suncak*/
app.use('/public', express.static(process.cwd() + '/public'));


/*The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require().
The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched.
process.cwd() returns the current working directory, i.e. the directory from which you invoked the node command. __dirname returns the directory name of the directory containing the JavaScript source code file
The process.env property returns an object containing the user environment.
and so on.
*/

/*https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get
aşağıdaki komutu anlmak için yukarıdaki linke iyice bak. çok fazla yazıya gerek kalmıyor. bunu router ilede yapabilirsin.
*/


app.get("/", function (request, response) {
  response.sendFile(process.cwd() + '/views/index.html');
});

/*
Assuming strict mode, var will let you re-declare the same variable in the same scope. On the other hand, let will not:

'use strict';
let me = 'foo';
let me = 'bar'; // SyntaxError: Identifier 'me' has already been declared
'use strict';
var me = 'foo';
var me = 'bar'; // No problem, `me` is replaced.
*/


/*This property is an object containing properties mapped to the named route “parameters”. 
For example, if you have the route /user/:name, then the “name” property is available as req.params.name. This object defaults to {}.*/

app.get('/:input',function(req,res){
  var input = req.params.input;
  input = input.split('%20').join('-');
  if(moment(input).isValid()||moment(input, 'X').isValid()){
    if(moment(input).isValid()){
    res.send({"unix":moment(input).unix(),"natural":moment(input).format('MMMM DD, YYYY')});
  }
    else if(moment(input, 'X').isValid()){
    res.send({"unix":moment(input,"X").unix(),"natural":moment(input,"X").format('MMMM DD, YYYY')});
    }
  }
  console.log("ok");
});
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
