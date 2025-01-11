import React, { useState } from 'react';
import { handleError, handleSuccess } from '../utils/ReactToast';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you include Toastify styles
import { login } from '../Todo/todoApi/auth';


const Login = () => {
  const [formValues, setFormValues] = useState({
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
  
    // Validation logic
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      errorMessages.push('Valid email is required');
    }
    if (!formValues.password || formValues.password.length < 6) {
      errorMessages.push('Password must be at least 6 characters');
    }
  
    if (errorMessages.length > 0) {
      // Display errors using Toastify
      errorMessages.forEach((errorMessage) => handleError(errorMessage));
    } else {
      try {
        // Simulate API call
        console.log('Form submitted:', formValues);
        const response = await login(formValues);
  
        // Check if login was successful
        if (response?.status  === 200) {
          handleSuccess('Login Successful!');
        } else {
          handleError(response?.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        // Catch any unexpected errors
        console.error('Login error:', error);
        handleError('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </div>

        {/* Link to Register */}
        <div className="mt-2 text-center">
          <Link to="/register" className="text-blue-500">
            Don't have an account? Register
          </Link>
        </div>
      </form>

      {/* Add Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
