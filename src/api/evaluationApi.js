import api from './axiosConfig';

export const createEvaluation = (data) => api.post('/evaluations', data);
export const getEvaluationById = (id) => api.get(`/evaluations/${id}`);
export const getEvaluationsByTeam = (teamId) => api.get(`/evaluations/team/${teamId}`);
export const getEvaluationsByTeacher = (teacherId) => api.get(`/evaluations/teacher/${teacherId}`);
