import api from './axiosConfig';

export const createProject = (data) => api.post('/projects', data);
export const getAllProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const getProjectsByTeacher = (teacherId) => api.get(`/projects/teacher/${teacherId}`);
