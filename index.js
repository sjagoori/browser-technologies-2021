const port = process.env.PORT || 3000;
const router = require('./routes/router');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting EJS as template engine 
app.set('view engine', 'ejs');
app.set('view options', { pretty: true });
app.use(express.static(__dirname + '/static'));


var Fingerprint = require('express-fingerprint')

app.use(Fingerprint({
  parameters: [
    // Defaults
    Fingerprint.useragent,
    Fingerprint.acceptHeaders,
    Fingerprint.geoip,

    // Additional parameters
    function (next) {
      // ...do something...
      next(null, {
        'param1': 'value1'
      })
    },
    function (next) {
      // ...do something...
      next(null, {
        'param2': 'value2'
      })
    },
  ]
}))

// We're using this file as router for all routes
app.use('/', router);

// Listen to port
app.listen(port);