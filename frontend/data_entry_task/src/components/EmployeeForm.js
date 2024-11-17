import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        dateOfJoining: '',
        phoneNumber: '',
        age: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/employees', formData);
            setMessage('Employee added successfully!');
            setFormData({ employeeId: '', name: '', dateOfJoining: '', phoneNumber: '', age: '' }); // Reset form
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.error || error.message));
        }
    };

    useEffect(() => {
        const handleOutsideClick = () => setMessage('');

        if (message) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [message]);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Add Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label htmlFor="employeeId" className="text-sm font-medium text-gray-600">Employee ID</label>
                    <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        placeholder="Employee ID"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="dateOfJoining" className="text-sm font-medium text-gray-600">Date of Joining</label>
                    <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="age" className="text-sm font-medium text-gray-600">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                >
                    Submit
                </button>
            </form>
            {message && (
                <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default EmployeeForm;
