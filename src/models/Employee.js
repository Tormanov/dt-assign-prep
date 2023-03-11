const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true,
        min: '1900-01-01',
        max: '2020-01-01',
        match: /^\d{4}-\d{2}-\d{2}$/,

    },
    monthlySalary: {
        type: Number,
        required: true
    },
    tasksAssigned: [{
        type: mongoose.Types.ObjectId,
        ref: 'Task'
    }],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;