import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EmployeeData = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [employee, setEmployee] = useState(null);
    const [message, setMessage] = useState('');
    const containerRef = useRef(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees/${employeeId}`);
            setEmployee(response.data);
            setMessage('');
        } catch (error) {
            setMessage('Employee not found');
            setEmployee(null);
        } finally {
            setEmployeeId('');
        }
    };

    // Function to reset all state
    const resetAll = () => {
        setEmployeeId('');
        setEmployee(null);
        setMessage('');
    };

    // Effect to detect clicks outside the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                resetAll(); // Reset state and clear the container
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            resetAll(); // Reset state when unmounting
        };
    }, []);

    return (
        <div ref={containerRef} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Search Employee</h2>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    placeholder="Enter Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                >
                    Search
                </button>
            </div>
            {message && (
                <p className={`mt-4 text-center ${message.includes('not found') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}
            {employee && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Employee Details</h3>
                    <p className="text-gray-600">
                        <span className="font-medium">ID:</span> {employee.employeeId}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Name:</span> {employee.name}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Date of Joining:</span> {new Date(employee.dateOfJoining).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Phone:</span> {employee.phoneNumber}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Age:</span> {employee.age}
                    </p>
                </div>
            )}
        </div>
    );
};

export default EmployeeData;
