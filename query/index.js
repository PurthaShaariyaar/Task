// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an express application
const app = express();

// Use bodyParser middleware to parse JSON in the request body
app.use(bodyParser.json())

// Bypass CORS error
app.use(cors());

// Data structure to store all tasks (including activities) essentially an object
const tasks = {};

/**
 * Route handler endpoint to send all tasks
 */
app.get('/tasks', (req, res) => {
  res.send(tasks);
});

/**
 * Route handler endpoint to handle all post events
 * Destructure the properties in the request body: type & data
 * Check the type of each event > destructure its properties assign to data > assign to tasks
 * Send the response
 */
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'TaskCreated') {
    const { id, name } = data;

    tasks[id] = { id, name, activities: [] };
  }

  if (type === 'ActivityCreated') {
    const { id, activity, taskId } = data;

    const task = tasks[taskId];

    task.activities.push({ id, activity });
  }

  console.log(tasks);

  res.send({});
});

// Start the server and listen on port 4002
app.listen(4002, () => {
  console.log('Listening on port 4002..');
});
