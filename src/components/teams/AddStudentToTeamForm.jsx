import { useState } from 'react';

const AddStudentToTeamForm = ({ teams, students, onSubmit, loading }) => {
  const [teamId, setTeamId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamId || !studentId) { setError('Select both a team and a student'); return; }
    setError('');
    onSubmit(teamId, studentId);
    setTeamId('');
    setStudentId('');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Add Student to Team</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label>Team</label>
        <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
          <option value="">Select team</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id} disabled={t.status === 'FULL'}>
              Team #{t.id} — {t.projectTitle} {t.status === 'FULL' ? '(Full)' : ''}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Student</label>
        <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          <option value="">Select student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Student'}
      </button>
    </form>
  );
};

export default AddStudentToTeamForm;
