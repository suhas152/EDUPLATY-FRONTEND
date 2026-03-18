import { useState } from 'react';

const AssignTeacherForm = ({ teams, teachers, onSubmit, loading }) => {
  const [teamId, setTeamId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamId || !teacherId) { setError('Select both team and teacher'); return; }
    setError('');
    onSubmit(teamId, teacherId);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Assign Teacher to Team</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label>Team</label>
        <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
          <option value="">Select team</option>
          {/* TeamDTO has no name field — display project title + id */}
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              Team #{t.id} — {t.projectTitle}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Teacher</label>
        <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
          <option value="">Select teacher</option>
          {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Assigning...' : 'Assign Teacher'}
      </button>
    </form>
  );
};

export default AssignTeacherForm;
