const express = require('express');
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const taskRoutes = express.Router();

taskRoutes.route('/').get(getAllTasks).post(createTask);
taskRoutes.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = taskRoutes;
