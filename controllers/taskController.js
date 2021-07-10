const Task = require('../models/Task');
const asyncWrapper = require('../middlewire/async');
const { createCustomError, CustomAPIError } = require('../error/custom-error');

module.exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

module.exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

module.exports.getTask = asyncWrapper(async (req, res, next) => {
  let { id: taskID } = req.params;
  let task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No Task found with id:${taskID}`, 404));
  }
  res.status(201).json({ task });
});

module.exports.updateTask = asyncWrapper(async (req, res) => {
  let { id: updateId } = req.params;
  let updateTask = await Task.findOneAndUpdate({ _id: updateId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateTask) {
    return next(createCustomError(`Update Failed for id:${updateId}`, 404));
  }
  res.status(201).json({ task: updateTask, msg: 'Success' });
});

module.exports.deleteTask = asyncWrapper(async (req, res) => {
  let { id: taskID } = req.params;
  let deletedTask = await Task.findOneAndDelete({ _id: taskID });
  if (!deletedTask) {
    return next(
      createCustomError(`Unable to delete task with id: ${taskID}`, 404)
    );
  }
  res.status(201).json({ deletedTask });
});
