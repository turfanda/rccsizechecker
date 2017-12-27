var express = require("express");
var mongodb = require('mongodb').MongoClient;
var request = require('request');
var router = express.Router();


  //var engine = '000259003598894297703:hhqkjk_9of4'
  //var api_call = "https://www.googleapis.com/customsearch/v1?key="+keyId+"&cx="+engine+"&q="+escape(strSearch)+"&start="+offset+"&searchType=image&fields=items(link,snippet,image/thumbnailLink,image/contextLink)"


var dbUrl = process.env.MONGO_URI;

router.get('/imagesearch/*', function (req, res) {
  var api_call = "https://www.googleapis.com/customsearch/v1?key="+process.env.KEY_ID+"&cx=000259003598894297703:hhqkjk_9of4&q="+req.params[0]+"&start="+req.query.offset+"&searchType=image&fields=items(link,snippet,image/thumbnailLink,image/contextLink)"
  
  request(api_call,function (error, response, body){
    var temp={};
    var result = [];
    
  if(!error||response.statusCode==200){
    
    var links=JSON.parse(body);
    for(var x=0;x<links.items.length;x++){
      
      console.log(links.items[x]);
      temp={
      "url": links.items[x]["link"],
      "snippet": links.items[x]["snippet"],
      "thumbnail": links.items[x]["image"]["thumbnailLink"],
      "context": links.items[x]["image"]["contextLink"]
        }
      result.push(temp);
    }
    console.log(result);
    var info={
    "keyword":req.params[0],
    "time":(new Date()).toString() 
    }
    mongodb.connect(dbUrl, function (err, db) {
      if (err) {
        throw new Error('Database failed to connect!');
      } else {
        var myDB = db.db('image-search');
       myDB.collection("googleimage").insert(info, function (err, result) {db.close();});
      }
  });
    res.json(result);
  }
    else{
    res.send("something wrong");
    }
  });  
});

router.get('/latest/imagesearch/', function (req, res) {
  
  mongodb.connect(dbUrl,function(err,db){
  if(err)
    throw new Error('Database failed to connect!');
  else{
    var myDB = db.db('image-search');
    
    var x = myDB.collection("googleimage").find();
    var y =[];
    
    x.forEach(function(doc,err){
    
      var x = {
      "keyword":doc["keyword"],
      "date":doc["time"]
      }
      y.push(x)
    }, function(){
    res.send(y);
     db.close();
    });
  }
  
  });
});


module.exports = router;