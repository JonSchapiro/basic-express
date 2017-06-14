// server.js
// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

const db = {
  name: ''
}
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/resource', function(req, res) {

  //generally we would do some work here to retrieve a resource or perform other business logic
  if (!req.query.name || req.query.name !== db.name) {
    res.status(400);
    return res.json({
      body: req.query,
      message: 'You must provide the correct name as a query param'
    });
  }

  res.status(200); // here we set the status of the request (everything worked as it should or report the error)
  res.json({
    body: req.query,
    message: 'hooray! you made your first get request'
  });
});

router.post('/resource', function(req, res) {
  if (!req.body.name) {
    res.status(400);
    return res.json({
      body: req.body,
      message: 'You must provide a name to post'
    });
  }

  db.name = req.body.name;

  res.status(200);
  res.json({
    body: req.body,
    message: 'hooray! you made your first post request and added a name to the db'
  });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);