/**
 * Server for CS 336, Lab 6
 * This implements an application server for some HTTP routing exercises.
 *
 * @author meliornox
 * @version fall2016
 *
 * Exercise using curl:
 *    curl -X POST localhost:3000 -d '{"arg":"value..."}' -H 'Content
 *        Type: application/json'
 * 6.1 Results: a. Chrome: 
 *                 Curl: all
 *                 Commands: curl --head localhost:3000/request
 *                           curl-X method localhost -d 5 -H 'Content-
 *                              Type: application/json' where method =
 *                              {GET, PUT, POST, DELETE, OPTIONS}
 *              b. 405- Method not allowed
 *
 * 6.2 Results: a. HTML forms only support GET and POST, but GET, POST, PUT, DELETE are supported 
 * 			by Chrome because it implements XMLHttpRequest.
 *              b. The form data is being passed back by the <form> element.  Here the data looks 
 *			like user_name=Jay&user_email=jaygbigelow@gmail.com&user_message=Hi.  It's 
 *			being formatted so it can be sent as one big block.
 */

const express = require('express')
const app = express();
const HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const HOST = "localhost";
const PORT = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/', function(req, res) {
    res.send("Hello, POST!<br>Request: " + req.rawHeaders + "<br>Message: " + req.body.user_message);
});

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});

app.route('/request')
    .get(function (req, res) {
        res.status(HttpStatus.OK);
        res.send('Hello World!');
    })
    .head(function (req, res) {
        res.status(HttpStatus.OK);
        res.send('Got a HEAD request at /request' + '\n');
    })
    .put(function (req, res) {
        res.status(HttpStatus.OK);
        res.send('Got a PUT request at /request '+ req.body.arg + '\n');
    })
    .post(function (req, res) {
        res.status(HttpStatus.OK);
        res.send('Hello, form POST!<br>Posted message: <code>'
	     + req.body.user_message + '</code>');
    })
    .delete(function (req, res) {
        res.status(HttpStatus.OK);
        res.send('Got a DELETE request at /request '+ req.body.arg + '\n');
    })
    .all(function (req, res) {
        res.status(HttpStatus.METHOD_NOT_ALLOWED);
        res.send('That method is not allowed' + '\n');
    });