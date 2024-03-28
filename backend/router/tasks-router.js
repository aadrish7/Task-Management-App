const express = require('express');
const router = express.Router();
const tasksController = require('../controller/tasks-controller');

// Route to retrieve all tasks
router.get('/tasks', tasksController.tasksAll);

// Route to create a new task
router.post('/tasks', tasksController.tasksCreate);

// Route to delete a task by ID
router.delete('/tasks/:id', tasksController.tasksDelete);

// Route to mark a task as complete
router.put('/tasks/:id/complete', tasksController.tasksComplete);

module.exports = router;
