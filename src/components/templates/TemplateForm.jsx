import { useState } from 'react';

const TemplateForm = ({ projects, onSubmit, loading, createdById }) => {
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectId) { setError('Please select a project'); return; }
    setError('');
    onSubmit({ projectId: parseInt(projectId, 10), createdById });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Create Evaluation Template</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label>Project</label>
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">Select project</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Template'}</button>
    </form>
  );
};

export default TemplateForm;
