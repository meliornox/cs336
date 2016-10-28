/*
*   @author: Jay Bigelow
*   @version: Fall 2016
*/
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

var multer = require('multer'); 
var upload = multer(); 
app.use(bodyParser.json());

app.use('/static', express.static(__dirname+'/public'));

var idCounter = 4;

function Person (id, firstName, lastName, hireDate) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.hireDate = hireDate;
}

var list = [];
var p1 = new Person(1, "Amy", "Oberwyk", "08/05/2010");
var p2 = new Person(2, "Terrence", "Bartholemew", "01/01/2001");
var p3 = new Person(3, "Evan", "Eversma", "06/07/2008");
var p4 = new Person(4, "Corey", "Booker", "02/20/2002");

list.push(p1);
list.push(p2);
list.push(p3);
list.push(p4);

app.get('/people', function (req, res) {
  res.json(list);
});

app.get('/person/:id', function (req, res) {
    if ((req.params.id)-1 in list) {
      res.json(list[req.params.id-1]);
    } else {
      res.sendStatus(404);
    }
});

app.get('/add/', function(req, res) {
  res.sendFile(__dirname+'/public/newPerson.html');
});

app.get('/find/', function(req, res) {
  res.sendFile(__dirname+'/public/getPerson.html');
});

app.post('/person/', function(req, res) {
  var setID = idCounter++;
  var newPerson = new Person(setID, req.body.firstname, req.body.lastName, req.body.years);
  list.push(newPerson);
  res.json(newPerson);
});

app.put('/person/:id', function(req, res) {
  if (req.params.id-1 in list) {
    put.Person(req.params.id-1, req.body.firstname, req.body.lastName, req.body.years);
  } else {
    res.sendStatus(404);
  }
})

app.delete('/person/:id', function(req, res) {
  if (req.params.id-1 in list) {
    delete(Person(req.params.id-1));
  } else {
    res.sendStatus(404);
  }
})

app.get('/person/:id/name', function (req, res) {
    if (req.params.id-1 in list) {
      res.json({"First Name": list[req.params.id-1].firstName,
                "Last Name" : list[req.params.id-1].lastName});
    } else {
      res.sendStatus(404);
    }
});

app.get('/person/:id/years', function (req, res) {
    if (req.params.id-1 in list) {
      res.json({ "Anniversary" : getTime(list[req.params.id-1].hireDate)});
    } else {
      res.sendStatus(404);
    }
});

function getTime(dateString) {
    var today = new Date();
    var hireDate = new Date(dateString);
    var years = today.getFullYear() - hireDate.getFullYear();
    var m = today.getMonth() - hireDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < hireDate.getDate())) {
        years--;
    }
    return years;
}

app.listen(port, function () {
  console.log('Listening on port ' + port);
});