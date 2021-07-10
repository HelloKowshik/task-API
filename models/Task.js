const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name must be provided'],
    trim: true,
    minlength: [3, 'must be minimum 3 character long'],
    maxlength: [100, 'length can not be more then 100 char.'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: new Date().toDateString(),
  },
});

module.exports = mongoose.model('Task', TaskSchema);
