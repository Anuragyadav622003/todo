import React from 'react';
import TodoRouters from './router/TodoRouters';
import Navbar from './nav/Navbar';


function App() {
 
  return (
    <div>
      <Navbar/>
      <TodoRouters/>
    </div>
  )
}

export default App