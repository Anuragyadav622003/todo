import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { deleteTaskId, getTasksList, updateTask } from '../Todo/todoApi/task';
import { Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField } from '@mui/material';
import { handleError, handleSuccess } from '../utils/ReactToast';

const TodoListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from the API
  const getTasks = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await getTasksList(); // API call to fetch tasks
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
  }, []);

  useEffect(() => {
    getTasks(); // Fetch tasks on mount
  }, [getTasks]);

  const handleUpdateTask = async () => {
    if (!editingTask || !newTask.trim()) return;

    try {
      const resp = await updateTask(editingTask._id, { task: newTask, status: editingTask.status });
      if (resp.status === 200) {
        handleSuccess(resp.data.message || 'Task updated successfully');
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTask._id ? { ...task, task: newTask } : task
          )
        );
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

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      const resp = await deleteTaskId(taskId);
      if (resp.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
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

  const toggleTaskCompletion = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Complete' : 'Pending';
    try {
      const resp = await updateTask(task._id, { task: task.task, status: newStatus });
      if (resp.status === 200) {
        handleSuccess(resp.data.message || 'Task status updated');
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
        );
      } else {
        handleError(resp?.data?.message || 'Failed to update task status');
      }
    } catch (error) {
      console.error('Error toggling task status:', error);
      handleError('Error toggling task status');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTask(task.task);
  };

  const taskList = useMemo(
    () => tasks.map((task, index) => (
      <TableRow key={task._id} sx={{ backgroundColor: index % 2 === 0 ? 'rgba(240, 240, 240, 0.5)' : 'white' }}>
        <TableCell align="center">
          <Checkbox checked={task.status === 'Complete'} onChange={() => toggleTaskCompletion(task)} />
        </TableCell>
        <TableCell>
          <Typography
            variant="body2"
            style={{
              textDecoration: task.status === 'Complete' ? 'line-through' : 'none',
              color: task.status === 'Complete' ? '#888' : '#000'
            }}
          >
            {task.task}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="body2"
            sx={{
              backgroundColor: task.status === 'Complete' ? 'lightgreen' : 'lightyellow',
              padding: '4px 8px',
              borderRadius: '12px',
            }}
          >
            {task.status}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(task)}>
            Edit
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button variant="outlined" color="error" size="small" onClick={() => deleteTask(task._id)}>
            Delete
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button variant="outlined" color="success" size="small" onClick={() => alert(`Sharing task: ${task.task}`)}>
            Share
          </Button>
        </TableCell>
      </TableRow>
    )),
    [tasks]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        To-Do List
      </Typography>

      {editingTask && (
        <div className="mt-4 flex items-center space-x-4">
          <TextField
            label="Edit Task"
            variant="outlined"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTask}
            disabled={loading || !newTask.trim()}
            sx={{ minWidth: '120px' }}
          >
            Update Task
          </Button>
        </div>
      )}

      {loading ? (
        <Typography variant="body1" align="center" color="textSecondary">Loading tasks...</Typography>
      ) : tasks.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">No tasks available. Add some tasks!</Typography>
      ) : (
        <TableContainer className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Complete</TableCell>
                <TableCell align="center">Task</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Share</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{taskList}</TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TodoListPage;
