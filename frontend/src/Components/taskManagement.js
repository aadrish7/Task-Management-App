import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styling.css'

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:3001/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    const handleAddTask = () => {
        if (taskInput.trim() !== '') {
            axios.post('http://localhost:3001/tasks', { content: taskInput, completed: false })
                .then(() => {
                    setTaskInput('');
                    fetchTasks();
                })
                .catch(error => {
                    console.error('Error adding task:', error);
                });
        }
    };

    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:3001/tasks/${taskId}`)
            .then(() => {
                fetchTasks();
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    const handleCompleteTask = (taskId) => {
        axios.put(`http://localhost:3001/tasks/${taskId}/complete`, { completed: true})
            .then(() => {
                fetchTasks();
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };

    return (
        <div>
            <h1>Task Management Application by Aadrish</h1>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <span>{task.content}</span>
                        {!task.completed && (
                            <button id = "comp" onClick={() => handleCompleteTask(task.id)}>Mark Complete</button>
                        )}
                        <button id = "delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
