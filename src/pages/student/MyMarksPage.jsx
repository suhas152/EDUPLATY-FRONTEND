import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTeamsByStudent } from '../../api/teamApi';
import { getEvaluationsByTeam } from '../../api/evaluationApi';
import EvaluationDetails from '../../components/evaluations/EvaluationDetails';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

const MyMarksPage = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [evalsByTeam, setEvalsByTeam] = useState({});
  const [selectedEval, setSelectedEval] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamsByStudent(user.id)
      .then(async (res) => {
        const myTeams = res.data || [];
        setTeams(myTeams);
        // fetch evaluations for every team in parallel
        const results = await Promise.all(
          myTeams.map((t) =>
            getEvaluationsByTeam(t.id)
              .then((r) => ({ teamId: t.id, evals: r.data || [] }))
              .catch(() => ({ teamId: t.id, evals: [] }))
          )
        );
        const map = {};
        results.forEach(({ teamId, evals }) => { map[teamId] = evals; });
        setEvalsByTeam(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <Loader />;

  const teamsWithEvals = teams.filter((t) => evalsByTeam[t.id]?.length > 0);

  return (
    <div>
      <h1 className="page-title">My Marks</h1>

      {teamsWithEvals.length === 0 ? (
        <EmptyState message="No evaluations found for your teams yet." />
      ) : (
        teamsWithEvals.map((team) => (
          <div key={team.id} style={{ marginBottom: '2rem' }}>
            <h2 className="section-title">
              Team #{team.id} — {team.projectTitle}
              {team.assignedTeacherName && (
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 400, marginLeft: '0.75rem' }}>
                  Evaluated by {team.assignedTeacherName}
                </span>
              )}
            </h2>

            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Evaluated By</th>
                  <th>Total Marks</th>
                  <th>Feedback</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {evalsByTeam[team.id].map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.evaluatedByName || '—'}</td>
                    <td>
                      <span style={{
                        color: '#a78bfa',
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}>
                        {e.totalMarks}
                      </span>
                    </td>
                    <td>{e.feedback || '—'}</td>
                    <td>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedEval(selectedEval?.id === e.id ? null : e)}
                      >
                        {selectedEval?.id === e.id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {evalsByTeam[team.id].map((e) =>
              selectedEval?.id === e.id ? (
                <EvaluationDetails
                  key={e.id}
                  evaluation={e}
                  onClose={() => setSelectedEval(null)}
                />
              ) : null
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyMarksPage;
