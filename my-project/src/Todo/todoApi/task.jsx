import axios from "axios";
import Base_URL from "../../Base_Url";

// Get the token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem("token");
  console.log("Token",token)
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }
  return token;
};

// Common headers for API requests
const getAuthHeaders = () => {
  const token = getAuthToken();
  console.log("Token",token)
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Get all tasks
export const getTasksList = async () => {
  try {
    const resp = await axios.get(`${Base_URL}api/tasks`, {
      headers: getAuthHeaders(),
    });
    return resp;
  } catch (error) {
    console.error(
      `Error fetching tasks: ${error.message}`,
      error.response?.data || error.stack
    );
    throw error;
  }
};

// Create a task
export const createTask = async (taskData) => {
  try {
    const resp = await axios.post(`${Base_URL}api/tasks`, taskData, {
      headers: getAuthHeaders(),
    });
    console.log(resp);
    return resp;
  } catch (error) {
    console.error(
      `Error creating task: ${error.message}`,
      error.response?.data || error.stack
    );
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId, updatedData) => {
  try {  
    console.log("updateTask",taskId,updatedData);
    const resp = await axios.put(`${Base_URL}api/tasks/${taskId}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return resp;
  } catch (error) {
    console.error(
      `Error updating task (ID: ${taskId}): ${error.message}`,
      error.response?.data || error.stack
    );
    throw error;
  }
};

// Delete a task
export const deleteTaskId = async (taskId) => {
  try {
    console.log(taskId,"hjgjg")
    const resp = await axios.delete(`${Base_URL}api/tasks/${taskId}`, {
      headers: getAuthHeaders(),
    });
    return resp;
  } catch (error) {
    console.error(
      `Error deleting task (ID: ${taskId}): ${error.message}`,
      error.response?.data || error.stack
    );
    throw error;
  }
};

// Share a task
export const shareTask = async (taskId, shareData) => {
  try {
    const resp = await axios.post(`${Base_URL}api/tasks/${taskId}/share`, shareData, {
      headers: getAuthHeaders(),
    });
    return resp.data;
  } catch (error) {
    console.error(
      `Error sharing task (ID: ${taskId}): ${error.message}`,
      error.response?.data || error.stack
    );
    throw error;
  }
};
