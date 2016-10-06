/**
 * Sample server for CS 336, Unit 4
 *
 * @author kvlinden
 * @version summer2016
 */

const express = require('express')
const app = express();

app.set('port', (process.env.PORT || 3000));

class Person {
    //startDate is a Date object
    constructor(firstName, lastName, loginID, startDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.loginID = loginID;
        this.startDate = startDate;
    }
    seniority() {
        return 2016 - this.startDate.getFullYear();
    }
    name() {
        return this.firstName + " " + this.lastName;
    }
}

var employees = {
  "amb23": { firstName : "Alice", lastName : "Barnes", startDate : "08/04/2012" },
  "als09": { firstName : "Anna", lastName : "Smith", startDate : "05/09/2014"}
};

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port') + '...');
});

app.get('/', function (req,res) {
    res.send('Hello World!');
});

app.get('/people', function (req,res) {
    res.json(employees);
});

app.get('/person/:loginID', function(req, res) {
    res.send(employees[req.params.loginID]);
});

//todo
app.get('/person/:userID/name', function(req, res) {
  var person = employees[req.params.loginID];
    res.send(person.firstName());
});

//todo
app.get('/person/:userID/year', function(req, res) {
    res.send('Year?');
    
});
