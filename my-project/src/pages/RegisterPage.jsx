import React, { useState } from 'react';
import { handleError, handleSuccess } from '../utils/ReactToast';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you include Toastify styles
import { register } from '../Todo/todoApi/auth';

const Register = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMessages = [];
  
    try {
      // Validation logic
      if (!formValues.name) {
        errorMessages.push('Name is required');
      }
      if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
        errorMessages.push('Valid email is required');
      }
      if (!formValues.password || formValues.password.length < 6) {
        errorMessages.push('Password must be at least 6 characters');
      }
  
      if (errorMessages.length > 0) {
        // Display errors using Toastify or your error handling function
        errorMessages.forEach((errorMessage) => handleError(errorMessage));
      } else {
        // Simulate API call
        console.log('Form submitted with values:', formValues);
        const resp = await register(formValues);
  
        if (resp?.status == '201') {
          handleSuccess(resp.data.message); // Handle success
        } else {
          handleError(resp?.data?.message || 'Something went wrong. Please try again.'); // Generic error if no message is returned
        }
      }
    } catch (error) {
      // Specific error logging for debugging
      console.error('Submission error:', error);
      handleError('An unexpected error occurred. Please try again.');
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formValues.name}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formValues.email}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Register
          </button>
        </div>

        {/* Link to Login */}
        <div className="mt-2 text-center">
          <Link to="/login" className="text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </form>

      {/* Add Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Register;
