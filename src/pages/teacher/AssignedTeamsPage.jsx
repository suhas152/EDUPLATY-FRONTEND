import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllTeams } from '../../api/teamApi';
import { getEvaluationsByTeam } from '../../api/evaluationApi';
import TeamList from '../../components/teams/TeamList';
import TeamMembersList from '../../components/teams/TeamMembersList';
import EvaluationDetails from '../../components/evaluations/EvaluationDetails';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

const AssignedTeamsPage = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [selected, setSelected] = useState(null);
  const [teamEvals, setTeamEvals] = useState([]);
  const [selectedEval, setSelectedEval] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTeams()
      .then((res) => {
        // Number() on both sides to avoid Long vs number type mismatch
        const assigned = res.data.filter((t) => Number(t.assignedTeacherId) === Number(user.id));
        setTeams(assigned);
      })
      .finally(() => setLoading(false));
  }, [user.id]);

  const handleSelectTeam = async (team) => {
    setSelected(team);
    setSelectedEval(null);
    try {
      const res = await getEvaluationsByTeam(team.id);
      setTeamEvals(res.data || []);
    } catch {
      setTeamEvals([]);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">Assigned Teams</h1>
      {teams.length === 0
        ? <EmptyState message="No teams assigned to you yet." />
        : <TeamList teams={teams} onSelect={handleSelectTeam} />
      }

      {selected && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3>Team #{selected.id} — {selected.projectTitle}</h3>
          <p>Project: {selected.projectTitle}</p>
          <p>Status: {selected.status}</p>

          <h4 style={{ marginTop: '1rem' }}>Members</h4>
          <TeamMembersList
            memberIds={selected.memberIds}
            memberNames={selected.memberNames}
            showRemove={false}
          />

          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate(`/teacher/evaluate/${selected.id}`)}>
              {teamEvals.length > 0 ? 'Re-Evaluate' : 'Evaluate'}
            </button>
            <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
          </div>

          {teamEvals.length > 0 && (
            <>
              <h4 style={{ marginTop: '1.5rem' }}>
                Past Evaluations ({teamEvals.length})
              </h4>
              <table className="data-table" style={{ marginTop: '0.5rem' }}>
                <thead>
                  <tr><th>#</th><th>Evaluated By</th><th>Total Marks</th><th></th></tr>
                </thead>
                <tbody>
                  {teamEvals.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{e.evaluatedByName}</td>
                      <td>{e.totalMarks}</td>
                      <td>
                        <button className="btn btn-outline btn-sm" onClick={() => setSelectedEval(e)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      {selectedEval && (
        <EvaluationDetails
          evaluation={selectedEval}
          onClose={() => setSelectedEval(null)}
        />
      )}
    </div>
  );
};

export default AssignedTeamsPage;
