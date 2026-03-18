import api from './axiosConfig';

export const getAllUsers = () => api.get('/users');
export const getAllStudents = () => api.get('/users/students');
export const getAllTeachers = () => api.get('/users/teachers');
export const getUserById = (id) => api.get(`/users/${id}`);
export const deleteUser = (id) => api.delete(`/users/${id}`);
