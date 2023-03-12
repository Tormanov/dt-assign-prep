const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, 'Assignee is required.']
    },
    assigneeName: {
        type: String,
        ref: 'Employee',
        required: [true, 'Assignee name is required.']
    },
    dueDate: {
        type: String,
        required: [true, 'Due date is required.'],
        min: ['2000-01-01', 'Due date cannot be earlier than 2000-01-01.'],
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Due date must be in the format YYYY-MM-DD.']
    },
    status: {
        type: String,
        required: [true, 'Status is required.']
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;