const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    assigneeName: {
        type: String,
        ref: 'Employee',
        required: true
    },
    dueDate: {
        type: String,
        required: true,
        min: '2000-01-01',
        match: /^\d{4}-\d{2}-\d{2}$/,

    },
    status: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;