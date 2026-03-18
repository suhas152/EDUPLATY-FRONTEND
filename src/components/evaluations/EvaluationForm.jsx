import { useState, useEffect } from 'react';

const EvaluationForm = ({ team, criteria, teacherId, onSubmit, loading }) => {
  const [marks, setMarks] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (criteria) {
      const init = {};
      criteria.forEach((c) => { init[c.id] = ''; });
      setMarks(init);
    }
  }, [criteria]);

  const total = Object.values(marks).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  const maxTotal = criteria?.reduce((sum, c) => sum + (parseFloat(c.maxMarks) || 0), 0) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmpty = Object.values(marks).some((v) => v === '');
    if (hasEmpty) { setError('Please fill all marks'); return; }
    const invalid = criteria.some((c) => parseFloat(marks[c.id]) > parseFloat(c.maxMarks));
    if (invalid) { setError('Some marks exceed the maximum'); return; }
    setError('');
    // Map to backend's CreateEvaluationDTO shape:
    // { teamId, evaluatedById, feedback, details: [{ criteriaId, criteriaName, maxMarks, marksObtained }] }
    const details = criteria.map((c) => ({
      criteriaId: c.id,
      criteriaName: c.criteriaName || c.name || '',
      maxMarks: parseInt(c.maxMarks, 10),
      marksObtained: parseInt(marks[c.id], 10),
    }));
    onSubmit({ teamId: team.id, evaluatedById: teacherId, feedback: '', details });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Evaluate: Team #{team?.id} — {team?.projectTitle}</h2>
      {error && <p className="error-msg">{error}</p>}
      {criteria?.map((c) => (
        <div className="form-group" key={c.id}>
          <label>{c.criteriaName || c.name} (max: {c.maxMarks})</label>
          <input
            type="number"
            min="0"
            max={c.maxMarks}
            value={marks[c.id] || ''}
            onChange={(e) => setMarks({ ...marks, [c.id]: e.target.value })}
            placeholder={`0 - ${c.maxMarks}`}
          />
        </div>
      ))}
      <p className="total-marks">Total: {total} / {maxTotal}</p>
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Evaluation'}</button>
    </form>
  );
};

export default EvaluationForm;
