import axios from 'axios';
const API_ENDPOINT = 'http://localhost:3006';

// Hàm để lấy tất cả các công việc
export const getAllTasks = () => {
  return axios.get(`${API_ENDPOINT}/todo`).then((response) => response.data);
};

// Hàm để lấy một công việc theo ID
export const getTaskById = (id) => {
  return axios
    .get(`${API_ENDPOINT}/todo/${id}`)
    .then((response) => response.data);
};

// Hàm để thêm một công việc mới
export const addTask = (task) => {
  return axios.post(`${API_ENDPOINT}/todo`, task).then((response) => response.data);
};

// Hàm để cập nhật một công việc
export const updateTask = (id, task) => {
  return axios.put(`${API_ENDPOINT}/todo/${id}`, task).then((response) => response.data);
};

//Hàm để xóa một công việc
export const deleteTask = (id) => {
  return axios.delete(`${API_ENDPOINT}/todo/${id}`).then((response) => response.data);
};