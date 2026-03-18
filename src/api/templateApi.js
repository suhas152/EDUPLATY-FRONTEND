import api from './axiosConfig';

export const createTemplate = (data) => api.post('/templates', data);
export const addCriteriaToTemplate = (id, data) => api.post(`/templates/${id}/criteria`, data);
export const getTemplateById = (id) => api.get(`/templates/${id}`);
export const getTemplateByProject = (projectId) => api.get(`/templates/project/${projectId}`);
export const getCriteriaByTemplate = (id) => api.get(`/templates/${id}/criteria`);
