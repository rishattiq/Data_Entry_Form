const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Create Employee
router.post('/', async (req, res) => {
    try {
        const { employeeId, name, dateOfJoining, phoneNumber, age } = req.body;
        const newEmployee = new Employee({ employeeId, name, dateOfJoining, phoneNumber, age });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get Employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({ employeeId: req.params.id });
        if (!employee) 
            return res.status(404).json({ error: "Employee not found" });
            res.json(employee);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
