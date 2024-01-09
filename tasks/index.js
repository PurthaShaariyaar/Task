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

// Data structure to store all tasks (initially empty)
const tasks = {};

/**
 * Route handler endpoint to GET all tasks
 */
app.get('/tasks', (req, res) => {
  res.send(tasks);
});

/**
 * Route handler endpoint to create a new task upon form submission from client
 * Calls randomBytes to generate a random id for the new task
 * Extracts the name from the request body -> creates a new object with the id and name
 * When a task is created -> route handler posts it to the event bus (an event)
 * Sends off a 201 OK status to the local cache of the data structure
 */
app.post('/tasks', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { name } = req.body;

  tasks[id] = {
    id, name
  };

  await axios.post('http://localhost:4005/events', {
    type: 'TaskCreated',
    data: {
      id, name
    }
  });

  res.status(201).send(tasks[id]);
});

/**
 * Route handler POST for posting any received events from the event-bus
 * Respond by 2 parameters: received event & type via request body
 */
app.post('/events', (req, res) => {
  console.log('Received event.', req.body.type);
});

// Start the server and listen on port 4000
app.listen(4000, () => {
  console.log('Listening on port 4000...');
});

