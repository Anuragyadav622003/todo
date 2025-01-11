import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Taskify</div>
        <div className="space-x-6">
          <a
            href="/"
            className="text-white hover:bg-indigo-800 px-4 py-2 rounded-lg transition-all duration-300"
          >
        New Task
          </a>
          <a
            href="/todo"
            className="text-white hover:bg-indigo-800 px-4 py-2 rounded-lg transition-all duration-300"
          >
            Dashboard
          </a>
          <a
            href="/login"
            className="text-white hover:bg-indigo-800 px-4 py-2 rounded-lg transition-all duration-300"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-white hover:bg-indigo-800 px-4 py-2 rounded-lg transition-all duration-300"
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
