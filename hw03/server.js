/**
* Server for employee records
* Developed in CS 336 at Calvin College
*
* @author meliornox
*/

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var db;
var dbConnection;
var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var HttpStatus = require('http-status-codes');

//Set using export MONGO_PASSWORD=password
//' + process.env.MONGO_PASSWORD + '
var mongoURL = 'mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds139567.mlab.com:39567/cs336';

MongoClient.connect(mongoURL, function (err, dbConnection) {
  if (err) throw err;
  dbConnection = db;
});

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/people', function (req, res) {
  db.collection('people').find({}).toArray(function(err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

app.get("/person/:id", function (req, res) {
  var id = Number(req.params.id);
  var collection = db.collection('people');

  var counter = collection.find({"id": id});
  counter.toArray(function(err, docs) {
    if(docs.length == 0) {
      res.sendStatus(404);
    } else {
      res.json(docs);
    }
  });
});

//app.get('/person/:id', function (req, res) {
//  db.collection("people").find({id: req.params.id}).toArray(function(err, docs) {
//    if (err) throw err;
//    res.json(docs);
//  });
//});

app.delete('/person/:id', function(req, res) {
  db.collection("people").remove({id: req.params.id});
  res.send('Person ' + req.params.id + " removed!");

});

app.get('/person/:id/name', function (req, res) {
  db.collection("people").find({id: req.params.id}).forEach(function (person) {
    res.send(person.first + " " + person.last);
  });
});

//Source https://code.google.com/archive/p/datejs/wikis/APIDocumentation.wiki#toISOString
//and http://www.w3schools.com/jsref/jsref_getfullyear.asp
app.get('/person/:id/years', function (req, res) {
  db.collection("people").find({id: req.params.id}).forEach(function(person) {
    var date = new Date.parseExact(person.start, "M/d/yyyy");
    var today = new Date();
    res.send("Years: " + (today.getFullYear() - date.getFullYear()));
  });
});

app.post('/people', function (req, res) {
  var newPerson = {
    id: req.body.id,
    first: req.body.first,
    last: req.body.last,
    start: req.body.start
  }

  db.collection("people").insert(newPerson, function(err, result) {
    if (err) throw err;
  });
});

app.get("*", function (req, res) {
	res.sendStatus(404);
});


app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});