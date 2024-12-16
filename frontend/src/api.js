// api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

// Fetch all titles
export const fetchtitles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching titles:', error);
    throw error;
  }
};

// Create a new title
export const createtitle = async (titleData) => {
  try {
    const response = await axios.post(API_URL, titleData);
    return response.data;
  } catch (error) {
    console.error('Error adding title:', error);
    throw error;
  }
};

// Update an existing title
export const updatetitle = async (titleId, titleData) => {
  try {
    const response = await axios.put(`${API_URL}/${titleId}`, titleData);
    return response.data;
  } catch (error) {
    console.error('Error updating title:', error);
    throw error;
  }
};

// Delete a title
export const deletetitle = async (titleId) => {
  try {
    await axios.delete(`${API_URL}/${titleId}`);
  } catch (error) {
    console.error('Error deleting title:', error);
    throw error;
  }
};

// Add subtask to a title
export const addSubtask = async (titleId, subtaskData) => {
  try {
    const response = await axios.put(`${API_URL}/${titleId}`, { subtasks: subtaskData });
    return response.data;
  } catch (error) {
    console.error('Error adding subtask:', error);
    throw error;
  }
};

// Update subtask
export const updateSubtask = async (titleId, subtasks) => {
  try {
    const response = await axios.put(`${API_URL}/${titleId}`, { subtasks });
    return response.data;
  } catch (error) {
    console.error('Error updating subtask:', error);
    throw error;
  }
};
