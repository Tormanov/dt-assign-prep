const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email must be unique."],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email format."]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required."]
    },
    dob: {
        type: String,
        required: [true, "Date of birth is required."],
        validate: {
            validator: function (v) {
                return /^\d{4}-\d{2}-\d{2}$/.test(v);
            },
            message: props => `${props.value} is not a valid date format (YYYY-MM-DD).`
        },
        min: ['1900-01-01', "Date of birth cannot be earlier than 1900-01-01."],
        max: ['2020-01-01', "Date of birth cannot be later than 2020-01-01."]
    },
    monthlySalary: {
        type: Number,
        required: [true, "Monthly salary is required."]
    },
    tasksAssigned: [{
        type: mongoose.Types.ObjectId,
        ref: 'Task'
    }],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;