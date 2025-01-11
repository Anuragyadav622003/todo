import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createTask, deleteTaskId, getTasksList,updateTask} from '../Todo/todoApi/task';
import { handleError, handleSuccess } from '../utils/ReactToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from the backend
  const getTasks = async () => {
    setLoading(true);
    try {
      const resp = await  getTasksList(); // API call to fetch tasks
      if (resp.status === 200) {
        setTasks(resp.data.tasks);
      } else {
        handleError(resp?.data?.message || 'Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      handleError('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on component mount
   useEffect(() => {
     getTasks();
   }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    setLoading(true);
    try {
      const resp = await createTask({ task: newTask });
      if (resp.status === 201) {
        handleSuccess(resp.data.message || 'Task created successfully');
        getTasks(); // Refresh tasks after adding
      } else {
        handleError(resp?.data?.message || 'Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      handleError('Error creating task');
    } finally {
      setLoading(false);
      setNewTask('');
    }
  };

  // Update task
  const handleUpdateTask = async () => {
    if (!editingTask || !newTask.trim()) return;
      
    // Call the API to update the task (add your update API logic here)
    try {
      // Assuming updateTask is defined in your API service
      const resp = await updateTask(editingTask._id, { task: newTask ,status:editingTask.status});
      if (resp.status === 200) {
        handleSuccess(resp.data.message || 'Task updated successfully');
       await getTasks(); // Refresh tasks after updating
      } else {
        handleError(resp?.data?.message || 'Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      handleError('Error updating task');
    } finally {
      setNewTask('');
      setEditingTask(null);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      const resp = await deleteTaskId(taskId);
      if (resp.status === 200) {
       await getTasks(); // Refresh tasks after deleting
        handleSuccess(resp.data.message || 'Task deleted successfully');
      
      } else {
        handleError(resp?.data?.message || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      handleError('Error deleting task');
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (task) => {
    
   

    const newStatus = task.status === 'Pending' ? 'Complete' : 'Pending';
    try {
      // Assuming updateTaskStatus is defined in your API service
     const resp = await updateTask(task._id, {task:task.task, status: newStatus });
      if (resp.status === 200) {
        handleSuccess(resp.data.message || 'Task status updated');
        getTasks(); // Refresh tasks after toggling status
      } else {
        handleError(resp?.data?.message || 'Failed to update task status');
      }
    } catch (error) {
      console.error('Error toggling task status:', error);
      handleError('Error toggling task status');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

      {/* Task Input Section */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full px-4 py-2 border rounded-md border-gray-300"
          placeholder="Add or update a task"
        />
        <button
          onClick={editingTask ? handleUpdateTask : handleAddTask}
          disabled={loading}
          className={`ml-2 px-4 py-2 rounded-md ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : editingTask
              ? 'bg-yellow-500 text-white'
              : 'bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Loading...' : editingTask ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 border rounded-md shadow-sm"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.status === 'Complete'}
                onChange={() => toggleTaskCompletion(task)}
                className="mr-2"
              />
              <span className={task.status === 'Complete' ? 'line-through text-gray-500' : ''}>
                {task.task}
              </span>
            </div>
            <div className="flex space-x-4">
              <span
                className={`${
                  task.status === 'Complete' ? 'text-green-600' : 'text-red-600'
                } font-semibold`}
              >
                {task.status}
              </span>
              <button
                onClick={() => {
                  setNewTask(task.task);
                  setEditingTask(task);
                }}
                className="text-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-4 text-center">
        <Link to="/todo" className="text-blue-500">
          View Full To-Do List
        </Link>
      </div>

      {/* Add Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HomePage;
