// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

// Create an express application
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json());

// Bypass CORS error
app.use(cors());

// Data structure to store all activities
const activitiesByTaskId = {};

/**
 * Route handler endpoint to get all activities
 * Either send the entire array with objects of id and activites or (||) an empty array
 */
app.get('/tasks/:id/activities', (req, res) => {
  res.send(activitiesByTaskId[req.params.id] || []);
});

/**
 * Route handler endpoint to create a new activity upon form submission from client
 * Calls randomBytes to generate a random id for the new activity
 * Extracts the activity property in the request body
 * Initiate activities by retrieving all activities or initialize to empty array
 * Push the new activity to activites with all the properties of the activity
 * Update the activitiesByTaskId with the updated activities
 * Send a status of OK with the updated activities
 */
app.post('/tasks/:id/activities', (req, res) => {
  const activityId = randomBytes(4).toString('hex');
  const { activity } = req.body;

  const activities = activitiesByTaskId[req.params.id] || [];

  activities.push({ id: activityId, activity });

  activitiesByTaskId[req.params.id] = activities;

  // TODO: Event Bus Async Await Functionality

  res.status(201).send(activities);
});

/**
 * Route handler POST for posting any received events from the event-bus
 */

// Start the server and listen on port 4001
app.listen(4001, () => {
  console.log('Listening on port 4001...');
});
