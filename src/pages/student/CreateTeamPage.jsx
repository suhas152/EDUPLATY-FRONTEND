import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllProjects } from '../../api/projectApi';
import { getAllStudents } from '../../api/userApi';
import { createTeam, getTeamsByStudent } from '../../api/teamApi';
import TeamForm from '../../components/teams/TeamForm';
import Loader from '../../components/common/Loader';

const CreateTeamPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [alreadyInTeam, setAlreadyInTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    Promise.all([getAllProjects(), getAllStudents(), getTeamsByStudent(user.id)])
      .then(([p, s, myTeams]) => {
        setProjects(p.data);
        setStudents(s.data.filter((st) => st.id !== user.id));
        // block if student is already in any team
        setAlreadyInTeam((myTeams.data || []).length > 0);
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  const handleCreate = async (form) => {
    setSubmitting(true);
    setMsg('');
    try {
      await createTeam({
        projectId: parseInt(form.projectId, 10),
        createdById: user.id,
        memberIds: form.memberIds.map(Number),
      });
      setMsg('Team created successfully!');
      setAlreadyInTeam(true); // block further creation
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  if (alreadyInTeam) {
    return (
      <div>
        <h1 className="page-title">Create Team</h1>
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
      <h1 className="page-title">Create Team</h1>
      {msg && <p className="success-msg">{msg}</p>}
      <TeamForm projects={projects} students={students} onSubmit={handleCreate} loading={submitting} />
    </div>
  );
};

export default CreateTeamPage;
