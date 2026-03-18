import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTeamsByStudent } from '../../api/teamApi';
import TeamList from '../../components/teams/TeamList';
import TeamMembersList from '../../components/teams/TeamMembersList';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

const StudentTeamsPage = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamsByStudent(user.id)
      .then((res) => setTeams(res.data))
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">My Teams</h1>
      {teams.length === 0
        ? <EmptyState message="You are not part of any team yet." />
        : <TeamList teams={teams} onSelect={setSelected} />
      }
      {selected && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3>Team #{selected.id} — {selected.projectTitle}</h3>
          <p>Project: {selected.projectTitle}</p>
          <p>Assigned Teacher: {selected.assignedTeacherName || 'Not assigned yet'}</p>
          <p>Status: {selected.status}</p>
          <h4 style={{ marginTop: '1rem' }}>Members</h4>
          <TeamMembersList
            memberIds={selected.memberIds}
            memberNames={selected.memberNames}
            showRemove={false}
          />
          <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => setSelected(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentTeamsPage;
