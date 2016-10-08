/**
 * Server for CS 336, Homework 01
 *
 * @author meliornox, Jay Bigelow
 * @version 10072016
 */

const express = require('express')
const app = express();

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port') + '...');
});

//List of employees
var employees = {
  "amb23": { firstName : "Alice", lastName : "Barnes", startDate : "2012/08/04" },
  "als09": { firstName : "Anna", lastName : "Smith", startDate : "2014/05/09"}
};

//root response
app.get('/', function (req,res) {
    res.send('Hello World!');
});

//lists people
app.get('/people', function (req,res) {
    res.json(employees);
});

//gives info of person loginID, if none exists then gives a 404
app.get('/person/:loginID', function(req, res) {
	if (employees[req.params.loginID] != null){
		res.json(employees[req.params.loginID]);
	} else{
		res.sendStatus(404);
	}
});

//gives name of person loginID, if none exists then gives a 404
app.get('/person/:loginID/name', function(req, res) {
	if (employees[req.params.loginID] != null){
		res.json(employees[req.params.loginID].firstName + " " + 
		employees[req.params.loginID].lastName);
	} else{
		res.sendStatus(404);
	}
});

//gives seniority of person loginID, if none exists then gives a 404
app.get('/person/:loginID/year', function(req, res) {
	if (employees[req.params.loginID] != null){
		var startDate = new Date(employees[req.params.loginID].startDate);
	
		var date = new Date();
		var time = date.getFullYear() - startDate.getFullYear();

		res.json(time + " years");
	} else{
		res.sendStatus(404);
	}
});
