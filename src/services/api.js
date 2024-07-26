import axios from 'axios';

const API_URL = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1';

export const getAllEmployees = () => axios.get(`${API_URL}/employee`);
export const getEmployeeById = (id) => axios.get(`${API_URL}/employee/${id}`);
export const createEmployee = (employee) => axios.post(`${API_URL}/employee`, employee);
export const editEmployee = (id, employee) => axios.put(`${API_URL}/employee/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employee/${id}`);
export const getCountries = () => axios.get(`${API_URL}/country`);
