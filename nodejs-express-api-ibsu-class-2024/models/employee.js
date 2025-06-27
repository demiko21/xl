const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date },
    pid: { type: String, required: true, unique: true },
    position: { type: String, required: true},
    salary: { type: Number, required: true}
}, {
    collection: 'employees',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const EmpModel = mongoose.model('Employee', employeeSchema);
module.exports = EmpModel;