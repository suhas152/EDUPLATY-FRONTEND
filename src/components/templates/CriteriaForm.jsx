import { useState } from 'react';

const CriteriaForm = ({ templates, onSubmit, loading }) => {
  const [templateId, setTemplateId] = useState('');
  const [form, setForm] = useState({ criteriaName: '', maxMarks: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!templateId || !form.criteriaName.trim() || !form.maxMarks) { setError('All fields required'); return; }
    setError('');
    onSubmit(templateId, { criteriaName: form.criteriaName, maxMarks: parseInt(form.maxMarks, 10) });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Add Criteria</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-group">
        <label>Template</label>
        <select value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
          <option value="">Select template</option>
          {templates.map((t) => <option key={t.id} value={t.id}>{t.projectTitle || t.name || `Template #${t.id}`}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Criteria Name</label>
        <input value={form.criteriaName} onChange={(e) => setForm({ ...form, criteriaName: e.target.value })} placeholder="e.g. Code Quality" />
      </div>
      <div className="form-group">
        <label>Max Marks</label>
        <input type="number" value={form.maxMarks} onChange={(e) => setForm({ ...form, maxMarks: e.target.value })} placeholder="e.g. 10" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Criteria'}</button>
    </form>
  );
};

export default CriteriaForm;
