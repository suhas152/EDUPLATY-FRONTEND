import { useEffect, useState } from 'react';
import { getAllProjects, createProject } from '../../api/projectApi';import ProjectForm from '../../components/projects/ProjectForm';
import ProjectList from '../../components/projects/ProjectList';
import Loader from '../../components/common/Loader';

import { useAuth } from '../../context/AuthContext';

const ManageProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchProjects = () => {
    getAllProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setMsg('Failed to load projects'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (data) => {
    setSubmitting(true);
    try {
      await createProject(data);
      setMsg('Project created successfully');
      fetchProjects();
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">Manage Projects</h1>
      {msg && <p className="success-msg">{msg}</p>}
      <ProjectForm onSubmit={handleCreate} loading={submitting} createdById={user?.id} />
      <h2 className="section-title">All Projects</h2>
      <ProjectList projects={projects} />
    </div>
  );
};

export default ManageProjectsPage;
