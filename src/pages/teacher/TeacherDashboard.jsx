import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllTeams } from '../../api/teamApi';
import { getEvaluationsByTeacher } from '../../api/evaluationApi';
import { getAllProjects } from '../../api/projectApi';
import DashboardCard from '../../components/dashboard/DashboardCard';
import EvaluationList from '../../components/evaluations/EvaluationList';
import TeamList from '../../components/teams/TeamList';
import ProjectList from '../../components/projects/ProjectList';
import Loader from '../../components/common/Loader';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    Promise.all([getEvaluationsByTeacher(user.id), getAllProjects(), getAllTeams()])
      .then(([evals, projects, teams]) => {
        const assignedTeams = teams.data.filter(
          (t) => Number(t.assignedTeacherId) === Number(user.id)
        );
        setData({
          evaluations: evals.data,
          projects: projects.data,
          assignedTeams,
        });
      })
      .catch(() => setData({ evaluations: [], projects: [], assignedTeams: [] }))
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <Loader />;

  const toggle = (panel) => setActivePanel((prev) => (prev === panel ? null : panel));

  return (
    <div>
      <h1 className="page-title">Welcome, {user.name}</h1>
      <div className="stats-grid">
        <DashboardCard
          title="Evaluations Done"
          value={data.evaluations.length}
          color="#6c63ff"
          active={activePanel === 'evaluations'}
          onClick={() => toggle('evaluations')}
        />
        <DashboardCard
          title="Total Projects"
          value={data.projects.length}
          color="#43b89c"
          active={activePanel === 'projects'}
          onClick={() => toggle('projects')}
        />
        <DashboardCard
          title="Assigned Teams"
          value={data.assignedTeams.length}
          color="#f7a440"
          active={activePanel === 'assignedTeams'}
          onClick={() => toggle('assignedTeams')}
        />
      </div>

      {activePanel === 'evaluations' && (
        <div className="dashboard-panel">
          <h2 className="panel-title">Evaluations Done</h2>
          <EvaluationList evaluations={data.evaluations} />
        </div>
      )}
      {activePanel === 'projects' && (
        <div className="dashboard-panel">
          <h2 className="panel-title">All Projects</h2>
          <ProjectList projects={data.projects} />
        </div>
      )}
      {activePanel === 'assignedTeams' && (
        <div className="dashboard-panel">
          <h2 className="panel-title">My Assigned Teams</h2>
          <TeamList teams={data.assignedTeams} />
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
