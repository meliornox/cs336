/**
 * Sample server for CS 336, Unit 3 - Run with either:
 *    npm start
 *    node script.js
 * Modified by Jay Bigelow
 *
 * @author kvlinden
 * @version summer2016
 */

const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(app.get('port'), function () {
    console.log('Example app listening on portal ' + app.get('port') + '!');
});
