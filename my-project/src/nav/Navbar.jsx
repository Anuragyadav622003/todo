import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Taskify</div>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'
              }`
            }
          >
            New Task
          </NavLink>
          <NavLink
            to="/todo"
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'
              }`
            }
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
