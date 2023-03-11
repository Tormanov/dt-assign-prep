const Employee = require('../models/Employee');

exports.getAll = () => Employee.find({}).lean();

exports.getOne = (employeeId) => Employee.findById(employeeId).lean();

exports.search = async (name, phone) => {
    let employee = await this.getAll();

    if (name) {
        employee = employee.filter(x => x.name.toLowerCase() == name);
    }
    if (phone) {
        employee = employee.filter(x => x.phone == phone);
    }
    return employee;
};


exports.create = (employeeData) => Employee.create({ ...employeeData });

exports.edit = (employeeId, employeeData) => Employee.findByIdAndUpdate(employeeId, employeeData);

exports.delete = (employeeId) => Employee.findByIdAndDelete(employeeId);