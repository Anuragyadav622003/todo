import {  Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TodoList from "../pages/TodoList";

function TodoRouters() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    
  );
}

export default TodoRouters;
