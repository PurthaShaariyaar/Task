// Import required modules
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create an express application
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

/**
 * Route handler endpoint to post each event per service to all services
 * Extract the body of the request
 * Each post includes a catch error block
 * Send status of OK
 */
app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

// Start the server and listen on port 4005
app.listen(4005, () => {
  console.log('Listening on port 4005...');
});
