import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllProjects } from '../../api/projectApi';
import { getTeamsByProject, getTeamsByStudent, joinTeam } from '../../api/teamApi';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

const JoinTeamPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [alreadyInTeam, setAlreadyInTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    Promise.all([getAllProjects(), getTeamsByStudent(user.id)])
      .then(([p, myTeams]) => {
        setProjects(p.data);
        setAlreadyInTeam((myTeams.data || []).length > 0);
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  const handleProjectChange = async (id) => {
    setProjectId(id);
    if (!id) { setTeams([]); return; }
    try {
      const res = await getTeamsByProject(id);
      setTeams(res.data);
    } catch {
      setTeams([]);
    }
  };

  const handleJoin = async (teamId) => {
    setMsg('');
    try {
      await joinTeam(teamId, user.id);
      setMsg('Joined team successfully!');
      setAlreadyInTeam(true); // block further joining
      handleProjectChange(projectId);
    } catch (err) {
      setMsg(err.message);
    }
  };

  if (loading) return <Loader />;

  if (alreadyInTeam) {
    return (
      <div>
        <h1 className="page-title">Join a Team</h1>
        <div className="card" style={{ maxWidth: 480 }}>
          <h3 style={{ color: '#f87171' }}>Not Allowed</h3>
          <p style={{ marginTop: '0.5rem' }}>
            You are already a member of a team. A student can only belong to one team at a time.
          </p>
          <p style={{ marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.88rem' }}>
            Visit <strong>My Teams</strong> to see your current team.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Join a Team</h1>
      {msg && <p className="success-msg">{msg}</p>}

      <div className="form-card" style={{ maxWidth: 420 }}>
        <h2>Select a Project</h2>
        <div className="form-group">
          <label>Project</label>
          <select value={projectId} onChange={(e) => handleProjectChange(e.target.value)}>
            <option value="">— choose a project —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {projectId && (
        teams.length ? (
          <>
            <h2 className="section-title">Available Teams</h2>
            <div className="card-grid">
              {teams.map((t) => (
                <div key={t.id} className="card">
                  <h3>Team #{t.id}</h3>
                  <p>Project: {t.projectTitle}</p>
                  <p>Members: {t.memberNames?.length || 0}</p>
                  <p>Status: <span style={{ color: t.status === 'FULL' ? '#f87171' : '#86efac' }}>{t.status}</span></p>
                  {t.memberNames?.length > 0 && (
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                      {t.memberNames.join(', ')}
                    </p>
                  )}
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: '1rem', width: '100%' }}
                    disabled={t.status === 'FULL'}
                    onClick={() => handleJoin(t.id)}
                  >
                    {t.status === 'FULL' ? 'Team Full' : 'Join Team'}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState message="No teams found for this project." />
        )
      )}

      {!projectId && (
        <EmptyState message="Select a project above to see available teams." />
      )}
    </div>
  );
};

export default JoinTeamPage;
