import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async (token) => {
  const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const createTask = async (token, taskData) => {
  const res = await axios.post(API_URL, taskData, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const updateTask = async (token, taskId, taskData) => {
  const res = await axios.patch(`${API_URL}/${taskId}`, taskData, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const deleteTask = async (token, taskId) => {
  await axios.delete(`${API_URL}/${taskId}`, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateTaskStatus = async (token, taskId, status) => {
    const res = await axios.patch(`${API_URL}/${taskId}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
    return res.data;
  };