// EvaluationDTO: { id, teamId, evaluatedById, evaluatedByName, totalMarks, feedback, details[] }
// EvaluationDetailDTO: { criteriaId, criteriaName, maxMarks, marksObtained }
const EvaluationDetails = ({ evaluation, onClose }) => {
  if (!evaluation) return null;
  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <h3>Evaluation #{evaluation.id}</h3>
      <p>Team: Team #{evaluation.teamId}</p>
      <p>Evaluated by: {evaluation.evaluatedByName}</p>
      <p>Total Marks: <strong style={{ color: '#a78bfa' }}>{evaluation.totalMarks}</strong></p>
      {evaluation.feedback && <p>Feedback: {evaluation.feedback}</p>}
      {evaluation.details?.length > 0 && (
        <table className="data-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr><th>Criteria</th><th>Max Marks</th><th>Marks Obtained</th></tr>
          </thead>
          <tbody>
            {evaluation.details.map((d, i) => (
              <tr key={i}>
                <td>{d.criteriaName}</td>
                <td>{d.maxMarks}</td>
                <td>{d.marksObtained}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {onClose && (
        <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={onClose}>Close</button>
      )}
    </div>
  );
};

export default EvaluationDetails;
