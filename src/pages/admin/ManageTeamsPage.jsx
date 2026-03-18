import { useEffect, useState } from 'react';
import { getAllTeams, assignTeacher, removeMember, joinTeam } from '../../api/teamApi';
import { getAllTeachers, getAllStudents } from '../../api/userApi';
import TeamList from '../../components/teams/TeamList';
import AssignTeacherForm from '../../components/teams/AssignTeacherForm';
import AddStudentToTeamForm from '../../components/teams/AddStudentToTeamForm';
import TeamMembersList from '../../components/teams/TeamMembersList';
import Loader from '../../components/common/Loader';

const ManageTeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchData = () => {
    setLoading(true);
    Promise.all([getAllTeams(), getAllTeachers(), getAllStudents()])
      .then(([t, tc, s]) => {
        setTeams(t.data);
        setTeachers(tc.data);
        setStudents(s.data);
      })
      .catch(() => setMsg('Failed to load data'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleAssign = async (teamId, teacherId) => {
    setSubmitting(true);
    setMsg('');
    try {
      await assignTeacher(teamId, teacherId);
      setMsg('Teacher assigned successfully');
      fetchData();
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddStudent = async (teamId, studentId) => {
    setSubmitting(true);
    setMsg('');
    try {
      await joinTeam(teamId, studentId);
      setMsg('Student added to team successfully');
      fetchData();
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (teamId, studentId) => {
    setMsg('');
    try {
      await removeMember(teamId, studentId);
      setMsg('Member removed');
      fetchData();
      setSelectedTeam(null);
    } catch (err) {
      setMsg(err.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">Manage Teams</h1>
      {msg && <p className="success-msg">{msg}</p>}

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <AssignTeacherForm teams={teams} teachers={teachers} onSubmit={handleAssign} loading={submitting} />
        <AddStudentToTeamForm teams={teams} students={students} onSubmit={handleAddStudent} loading={submitting} />
      </div>

      <h2 className="section-title">All Teams</h2>
      <TeamList teams={teams} onSelect={setSelectedTeam} />

      {selectedTeam && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3>Team #{selectedTeam.id} — {selectedTeam.projectTitle}</h3>
          <p>Project: {selectedTeam.projectTitle}</p>
          <p>Teacher: {selectedTeam.assignedTeacherName || 'Not assigned'}</p>
          <p>Status: {selectedTeam.status}</p>
          <h4 style={{ marginTop: '1rem' }}>Members</h4>
          <TeamMembersList
            memberIds={selectedTeam.memberIds}
            memberNames={selectedTeam.memberNames}
            teamId={selectedTeam.id}
            onRemove={handleRemove}
            showRemove
          />
          <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => setSelectedTeam(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageTeamsPage;
