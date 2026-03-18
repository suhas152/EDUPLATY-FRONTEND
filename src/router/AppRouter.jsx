import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES, getRoleHome } from '../utils/roleHelper';

import RoleBasedRoute from '../components/common/RoleBasedRoute';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsersPage from '../pages/admin/ManageUsersPage';
import ManageProjectsPage from '../pages/admin/ManageProjectsPage';
import ManageTeamsPage from '../pages/admin/ManageTeamsPage';
import ManageTemplatesPage from '../pages/admin/ManageTemplatesPage';

import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import AssignedTeamsPage from '../pages/teacher/AssignedTeamsPage';
import EvaluateTeamPage from '../pages/teacher/EvaluateTeamPage';
import TeacherEvaluationsPage from '../pages/teacher/TeacherEvaluationsPage';

import StudentDashboard from '../pages/student/StudentDashboard';
import StudentProjectsPage from '../pages/student/StudentProjectsPage';
import StudentTeamsPage from '../pages/student/StudentTeamsPage';
import CreateTeamPage from '../pages/student/CreateTeamPage';
import JoinTeamPage from '../pages/student/JoinTeamPage';
import MyMarksPage from '../pages/student/MyMarksPage';

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Navbar />
    <div className="app-body">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  </div>
);

// Redirects to role home if logged in, otherwise to /login
const RootRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={user ? getRoleHome(user.role) : '/login'} replace />;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={
        <RoleBasedRoute allowedRoles={[ROLES.MAIN_TEACHER]}>
          <AppLayout><AdminDashboard /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/admin/users" element={
        <RoleBasedRoute allowedRoles={[ROLES.MAIN_TEACHER]}>
          <AppLayout><ManageUsersPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/admin/projects" element={
        <RoleBasedRoute allowedRoles={[ROLES.MAIN_TEACHER]}>
          <AppLayout><ManageProjectsPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/admin/teams" element={
        <RoleBasedRoute allowedRoles={[ROLES.MAIN_TEACHER]}>
          <AppLayout><ManageTeamsPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/admin/templates" element={
        <RoleBasedRoute allowedRoles={[ROLES.MAIN_TEACHER]}>
          <AppLayout><ManageTemplatesPage /></AppLayout>
        </RoleBasedRoute>
      } />

      {/* Teacher */}
      <Route path="/teacher/dashboard" element={
        <RoleBasedRoute allowedRoles={[ROLES.TEACHER]}>
          <AppLayout><TeacherDashboard /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/teacher/assigned-teams" element={
        <RoleBasedRoute allowedRoles={[ROLES.TEACHER]}>
          <AppLayout><AssignedTeamsPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/teacher/evaluate/:teamId" element={
        <RoleBasedRoute allowedRoles={[ROLES.TEACHER]}>
          <AppLayout><EvaluateTeamPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/teacher/evaluations" element={
        <RoleBasedRoute allowedRoles={[ROLES.TEACHER]}>
          <AppLayout><TeacherEvaluationsPage /></AppLayout>
        </RoleBasedRoute>
      } />

      {/* Student */}
      <Route path="/student/dashboard" element={
        <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
          <AppLayout><StudentDashboard /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/student/projects" element={
        <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
          <AppLayout><StudentProjectsPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/student/teams" element={
        <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
          <AppLayout><StudentTeamsPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/student/create-team" element={
        <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
          <AppLayout><CreateTeamPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/student/join-team" element={
        <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
          <AppLayout><JoinTeamPage /></AppLayout>
        </RoleBasedRoute>
      } />
      <Route path="/student/marks" element={
        <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
          <AppLayout><MyMarksPage /></AppLayout>
        </RoleBasedRoute>
      } />

      {/* Catch-all: redirect to role home if logged in, else /login */}
      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
