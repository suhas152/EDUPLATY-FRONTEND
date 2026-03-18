import { useState } from 'react';

const TeamForm = ({ projects, students, onSubmit, loading }) => {
  const [form, setForm] = useState({ projectId: '', memberIds: [] });
  const [error, setError] = useState('');

  const toggleMember = (id) => {
    setForm((prev) => ({
      ...prev,
      memberIds: prev.memberIds.includes(id)
        ? prev.memberIds.filter((m) => m !== id)
        : [...prev.memberIds, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.projectId) { setError('Please select a project'); return; }
    setError('');
    onSubmit(form);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Create Team</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label>Project</label>
        <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}>
          <option value="">Select project</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Add Members</label>
        <div className="checkbox-list">
          {students.length === 0 && <span style={{ color: '#64748b', fontSize: '0.85rem' }}>No other students found</span>}
          {students.map((s) => (
            <label key={s.id} className="checkbox-item">
              <input type="checkbox" checked={form.memberIds.includes(s.id)} onChange={() => toggleMember(s.id)} />
              {s.name} ({s.email})
            </label>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Team'}
      </button>
    </form>
  );
};

export default TeamForm;
