import { useState } from 'react';

const ProjectForm = ({ onSubmit, loading, createdById }) => {
  const [form, setForm] = useState({ title: '', description: '', deadline: '', maxTeamSize: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required'); return; }
    if (!form.maxTeamSize || parseInt(form.maxTeamSize, 10) < 1) { setError('Max team size must be at least 1'); return; }
    setError('');
    onSubmit({
      title: form.title,
      description: form.description,
      deadline: form.deadline || null,
      maxTeamSize: parseInt(form.maxTeamSize, 10),
      createdById,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Create Project</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label>Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project title" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} />
      </div>
      <div className="form-group">
        <label>Max Team Size</label>
        <input type="number" min="1" value={form.maxTeamSize} onChange={(e) => setForm({ ...form, maxTeamSize: e.target.value })} placeholder="e.g. 4" />
      </div>
      <div className="form-group">
        <label>Deadline</label>
        <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Project'}</button>
    </form>
  );
};

export default ProjectForm;
