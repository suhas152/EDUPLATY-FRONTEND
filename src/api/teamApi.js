import api from './axiosConfig';

export const createTeam = (data) => api.post('/teams', data);
export const joinTeam = (teamId, studentId) => api.post(`/teams/join?teamId=${teamId}&studentId=${studentId}`);
export const getAllTeams = () => api.get('/teams');
export const getTeamById = (id) => api.get(`/teams/${id}`);
export const getTeamsByProject = (projectId) => api.get(`/teams/project/${projectId}`);
export const getTeamsByStudent = (studentId) => api.get(`/teams/student/${studentId}`);
export const assignTeacher = (teamId, teacherId) => api.post(`/teams/assign-teacher?teamId=${teamId}&teacherId=${teacherId}`);
export const removeMember = (teamId, studentId) => api.delete(`/teams/remove-member?teamId=${teamId}&studentId=${studentId}`);
