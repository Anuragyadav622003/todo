import Task from '../modals/Task.js';
import User from '../modals/User.js';

// Create a new task
export const createTask = async (req, res) => {
  const { task } = req.body;

  if (!task || typeof task !== 'string') {
    return res.status(400).json({ message: 'Task is required and must be a string' });
  }

  try {
    // Create a new task
    const newTask = await Task.insertMany({
      task,
      owner: req.user.id, // Assuming `req.user` is set by an auth middleware
    });

    // Send success response
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {

    
    const tasks = await Task.find({ owner: req.user.id })
      .populate('sharedWith', 'name email'); // Populate shared users' details
     console.log(tasks,"->",req.user.id)
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a task (mark as complete or edit description)
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;

  try {
    console.log(req.body,req.user.id)
    // Find task by ID and update it
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, owner: req.user.id },  // Search criteria: task id and owner
      {
        $set: { task: task, status: status }, // Fields to update
      },
      { new: true }  // Return the updated task
    );
    console.log(updatedTask);

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
 
  try {
    const task = await Task.findOneAndDelete({ _id: id, owner: req.user.id });
    console.log(task,"ghfghfgf")
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Share a task with another user by email
export const shareTask = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const task = await Task.findOne({ _id: id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email not found' });
    }

    if (!task.sharedWith.includes(user._id)) {
      task.sharedWith.push(user._id);
      await task.save();
    }

    res.status(200).json({ message: 'Task shared successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
