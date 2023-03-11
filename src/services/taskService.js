const Task = require('../models/task');

exports.getAll = () => Task.find({}).lean();

exports.getOne = (taskId) => Task.findById(taskId).lean();

exports.search = async (title, assignee) => {
    let task = await this.getAll();

    if (title) {
        task = task.filter(x => x.title.toLowerCase() == title);
    }
    if (assignee) {
        task = task.filter(x => x.assignee == assignee);
    }
    return task;
};


exports.create = (taskData) => Task.create({ ...taskData });

exports.edit = (taskId, taskData) => Task.findByIdAndUpdate(taskId, taskData);

exports.delete = (taskId) => Task.findByIdAndDelete(taskId);