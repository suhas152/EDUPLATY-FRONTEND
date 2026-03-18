import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTeamsByStudent } from '../../api/teamApi';
import { getAllProjects } from '../../api/projectApi';
import DashboardCard from '../../components/dashboard/DashboardCard';
import TeamList from '../../components/teams/TeamList';
import ProjectList from '../../components/projects/ProjectList';
import Loader from '../../components/common/Loader';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    Promise.all([getTeamsByStudent(user.id), getAllProjects()])
      .then(([teams, projects]) => setData({ teams: teams.data, projects: projects.data }))
      .catch(() => setData({ teams: [], projects: [] }))
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <Loader />;

  const toggle = (panel) => setActivePanel((prev) => (prev === panel ? null : panel));

  return (
    <div>
      <h1 className="page-title">Welcome, {user.name}</h1>
      <div className="stats-grid">
        <DashboardCard
          title="My Teams"
          value={data.teams.length}
          color="#43b89c"
          active={activePanel === 'teams'}
          onClick={() => toggle('teams')}
        />
        <DashboardCard
          title="Available Projects"
          value={data.projects.length}
          color="#6c63ff"
          active={activePanel === 'projects'}
          onClick={() => toggle('projects')}
        />
      </div>

      {activePanel === 'teams' && (
        <div className="dashboard-panel">
          <h2 className="panel-title">My Teams</h2>
          <TeamList teams={data.teams} />
        </div>
      )}
      {activePanel === 'projects' && (
        <div className="dashboard-panel">
          <h2 className="panel-title">Available Projects</h2>
          <ProjectList projects={data.projects} />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
