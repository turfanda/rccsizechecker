var express = require("express");
var mongodb = require('mongodb').MongoClient;
var router = express.Router();


  //var engine = '000259003598894297703:hhqkjk_9of4'
  //var api_call = "https://www.googleapis.com/customsearch/v1?key="+keyId+"&cx="+engine+"&q="+escape(strSearch)+"&start="+offset+"&searchType=image&fields=items(link,snippet,image/thumbnailLink,image/contextLink)"


var dbUrl = process.env.MONGO_URI;

router.get('/imagesearch/*', function (req, res) {
   var info={
   "keyword":req.params[0],
   "offset":req.query.offset};
  
    console.log(info);
   /*mongodb.connect(dbUrl, function (err, db) {
      if (err) {
        throw new Error('Database failed to connect!');
      } else {
        var myDB = db.db('image-search');
        myDB.collection("").insert(info, function (err, result) {db.close();});
      }
  });*/
  
  
});

router.get('/latest/imagesearch/', function (req, res) {
  
  var surl = req.params.surl;
  
  mongodb.connect(dbUrl,function(err,db){
  if(err)
    throw new Error('Database failed to connect!');
  else{
    var myDB = db.db('fcctest');
    
    var x = myDB.collection("url-info").find({"shortUrl":surl});
    var y =[];
    
    x.forEach(function(doc,err){
    
      y.push(doc)
    }, function(){
      db.close();
     res.redirect(y[0].longUrl);
    
    });
  }
  
  });
});


module.exports = router;