const knex = require('./../db'); //Our DB here

// Retrieve all tasks
exports.tasksAll = async (req, res) => {

    knex
        .select('*') 
        .from('tasks')
        .then(tasks => {
            res.json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: `There was an error retrieving tasks: ${err}` });
        });
}

// Create new task
exports.tasksCreate = async (req, res) => {

    knex('tasks')
        .insert({
            'content': req.body.content,
            'completed': false 
        })
        .then(() => {
            res.status(201).json({ message: `Task '${req.body.content}' created.` });
        })
        .catch(err => {
            res.status(500).json({ message: `There was an error creating task: ${err}` });
        });
}

// Remove specific task
exports.tasksDelete = async (req, res) => {

    const taskId = req.params.id; // Retrieve taskId from URL parameters
    knex('tasks')
        .where('id', taskId)
        .del() 
        .then(() => {
            res.json({ message: `Task ${taskId} deleted.` });
        })
        .catch(err => {
            res.status(500).json({ message: `There was an error deleting task: ${err}` });
        });
}
// Mark task as complete
exports.tasksComplete = async (req, res) => {

    const taskId = req.params.id;
    knex('tasks')
        .where('id', taskId)
        .update({ completed: true })
        .then(() => {
            res.json({ message: `Task ${taskId} marked as'complete` });
        })
        .catch(err => {
            console.log("Error in Completion",err)
            res.status(500).json({ message: `There was an error updating task: ${err}` });
        });
}

