const Task = require('../models/Task');

module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports.getTask = async (req, res) => {
  try {
    let { id: taskID } = req.params;
    let task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No Task found!` });
    }
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    let { id: updateId } = req.params;
    let updateTask = await Task.findOneAndUpdate({ _id: updateId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateTask) {
      return res.status(404).json({ msg: `Update Failed!` });
    }
    res.status(201).json({ task: updateTask, msg: 'Success' });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    let { id: taskID } = req.params;
    let deletedTask = await Task.findOneAndDelete({ _id: taskID });
    if (!deletedTask) {
      return res
        .status(404)
        .json({ msg: `Unable to delete task with id: ${taskID}` });
    }
    res.status(201).json({ deletedTask });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
