let express = require('express');
let request = require('request');
let bodyParser = require('body-parser');
let middleware = require("./middleware.js");
let app = express();
const hubspotKey = process.env.HUBSPOT_KEY;

app.use(bodyParser.json());
app.enable('trust proxy');

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, Content-Type, Accept");
  return next();
});

app.get('/', function (req, res) {
  res.send('Welcome to HubSpot Service');
});

// Handle POST request to '/save'
app.post('/save/', function(req, res, next) {

  if (middleware.authMiddleware(req)) {
    next()
  } else {res.send('Error!')}
}, function (req, res, next) {
  request({
    url: 'https://api.hubapi.com/contacts/v1/contact/?hapikey=' + hubspotKey,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    json: req.body,
  }, function(error, response, body) {
    res.json({
      'statusCode' : response.statusCode,
      'body' : response.body
    });
  })
});

app.listen(3000).on('listening', function() { console.log ('server listening') });
