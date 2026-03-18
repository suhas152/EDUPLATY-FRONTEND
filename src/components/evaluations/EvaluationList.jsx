import EmptyState from '../common/EmptyState';

// EvaluationDTO shape: { id, teamId, evaluatedById, evaluatedByName, totalMarks, feedback, details[] }
const EvaluationList = ({ evaluations, onSelect }) => {
  if (!evaluations?.length) return <EmptyState message="No evaluations found." />;
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Team ID</th>
          <th>Evaluated By</th>
          <th>Total Marks</th>
          <th>Feedback</th>
          {onSelect && <th>Details</th>}
        </tr>
      </thead>
      <tbody>
        {evaluations.map((e) => (
          <tr key={e.id}>
            <td>{e.id}</td>
            <td>Team #{e.teamId}</td>
            <td>{e.evaluatedByName || '—'}</td>
            <td>{e.totalMarks}</td>
            <td>{e.feedback || '—'}</td>
            {onSelect && (
              <td>
                <button className="btn btn-outline btn-sm" onClick={() => onSelect(e)}>View</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EvaluationList;
