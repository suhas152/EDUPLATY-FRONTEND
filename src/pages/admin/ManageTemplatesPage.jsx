import { useEffect, useState } from 'react';
import { getAllProjects } from '../../api/projectApi';
import { createTemplate, addCriteriaToTemplate, getTemplateByProject, getCriteriaByTemplate } from '../../api/templateApi';
import TemplateForm from '../../components/templates/TemplateForm';
import CriteriaForm from '../../components/templates/CriteriaForm';
import TemplateDetails from '../../components/templates/TemplateDetails';
import Loader from '../../components/common/Loader';

import { useAuth } from '../../context/AuthContext';

const ManageTemplatesPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [criteria, setCriteria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getAllProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setMsg('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateTemplate = async (data) => {
    setSubmitting(true);
    try {
      await createTemplate(data);
      setMsg('Template created');
      // Backend returns a plain string, so fetch the actual template object by project
      if (data.projectId) {
        const res = await getTemplateByProject(data.projectId);
        if (res.data) {
          setTemplates((prev) => {
            // avoid duplicates
            const exists = prev.find((t) => t.id === res.data.id);
            return exists ? prev : [...prev, res.data];
          });
        }
      }
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddCriteria = async (templateId, data) => {
    setSubmitting(true);
    try {
      await addCriteriaToTemplate(templateId, data);
      setMsg('Criteria added');
      // Refresh criteria for the currently viewed template
      const res = await getCriteriaByTemplate(templateId);
      setCriteria(res.data);
      // Also update selectedTemplate if it matches
      const matched = templates.find((t) => t.id === parseInt(templateId));
      if (matched) setSelectedTemplate(matched);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectTemplate = async (t) => {
    setSelectedTemplate(t);
    try {
      const res = await getCriteriaByTemplate(t.id);
      setCriteria(res.data);
    } catch {
      setCriteria([]);
    }
  };

  const handleProjectChange = async (projectId) => {
    if (!projectId) return;
    try {
      const res = await getTemplateByProject(projectId);
      if (res.data) {
        setTemplates((prev) => {
          const exists = prev.find((t) => t.id === res.data.id);
          return exists ? prev : [...prev, res.data];
        });
      }
    } catch {
      // no template for this project yet, that's fine
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">Manage Templates</h1>
      {msg && <p className="success-msg">{msg}</p>}
      <TemplateForm projects={projects} onSubmit={handleCreateTemplate} loading={submitting} createdById={user?.id} />
      <CriteriaForm templates={templates} onSubmit={handleAddCriteria} loading={submitting} />
      <div className="form-card" style={{ maxWidth: 400 }}>
        <h2>View Template by Project</h2>
        <div className="form-group">
          <label>Project</label>
          <select onChange={(e) => handleProjectChange(e.target.value)}>
            <option value="">Select project</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.title || p.name}</option>)}
          </select>
        </div>
      </div>
      {templates.map((t) => (
        <div key={t.id} style={{ marginBottom: '0.5rem' }}>
          <button className="btn btn-outline" onClick={() => handleSelectTemplate(t)}>
            {t.projectTitle || `Template #${t.id}`}
          </button>
        </div>
      ))}
      {selectedTemplate && <TemplateDetails template={selectedTemplate} criteria={criteria} />}
    </div>
  );
};

export default ManageTemplatesPage;
