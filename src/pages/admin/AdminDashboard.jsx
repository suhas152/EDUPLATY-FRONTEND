import { useEffect, useState } from 'react';
import DashboardCard from '../../components/dashboard/DashboardCard';
import Loader from '../../components/common/Loader';
import UserTable from '../../components/users/UserTable';
import TeamList from '../../components/teams/TeamList';
import ProjectList from '../../components/projects/ProjectList';
import { getAllUsers, getAllStudents, getAllTeachers } from '../../api/userApi';
import { getAllProjects } from '../../api/projectApi';
import { getAllTeams } from '../../api/teamApi';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    Promise.all([getAllUsers(), getAllStudents(), getAllTeachers(), getAllProjects(), getAllTeams()])
      .then(([users, students, teachers, projects, teams]) => {
        setData({
          users: users.data,
          students: students.data,
          teachers: teachers.data,
          projects: projects.data,
          teams: teams.data,
        });
      })
      .catch(() => setData({ users: [], students: [], teachers: [], projects: [], teams: [] }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const toggle = (panel) => setActivePanel((prev) => (prev === panel ? null : panel));

  const cards = [
    { key: 'users',    title: 'Total Users',  value: data.users.length,    color: '#6c63ff' },
    { key: 'students', title: 'Students',      value: data.students.length, color: '#43b89c' },
    { key: 'teachers', title: 'Teachers',      value: data.teachers.length, color: '#f7a440' },
    { key: 'projects', title: 'Projects',      value: data.projects.length, color: '#e05c5c' },
    { key: 'teams',    title: 'Teams',         value: data.teams.length,    color: '#5c9ee0' },
  ];

  const renderPanel = () => {
    if (!activePanel) return null;
    return (
      <div className="dashboard-panel">
        <h2 className="panel-title">{cards.find(c => c.key === activePanel)?.title}</h2>
        {(activePanel === 'users') && <UserTable users={data.users} showDelete={false} />}
        {(activePanel === 'students') && <UserTable users={data.students} showDelete={false} />}
        {(activePanel === 'teachers') && <UserTable users={data.teachers} showDelete={false} />}
        {(activePanel === 'projects') && <ProjectList projects={data.projects} />}
        {(activePanel === 'teams') && <TeamList teams={data.teams} />}
      </div>
    );
  };

  return (
    <div>
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="stats-grid">
        {cards.map((c) => (
          <DashboardCard
            key={c.key}
            title={c.title}
            value={c.value}
            color={c.color}
            active={activePanel === c.key}
            onClick={() => toggle(c.key)}
          />
        ))}
      </div>
      {renderPanel()}
    </div>
  );
};

export default AdminDashboard;
