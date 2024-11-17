const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfJoining: { type: Date, required: true },
    phoneNumber: { type: String, required: true, match: [/^\d{10}$/, 'Phone number must be exactly 10 digits.']},
    age: { type: Number, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);
