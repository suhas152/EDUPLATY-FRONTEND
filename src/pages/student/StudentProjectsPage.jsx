import { useEffect, useState } from 'react';
import { getAllProjects } from '../../api/projectApi';
import ProjectList from '../../components/projects/ProjectList';
import Loader from '../../components/common/Loader';

const StudentProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects()
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">Projects</h1>
      <ProjectList projects={projects} onSelect={setSelected} />
      {selected && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3>{selected.title || selected.name}</h3>
          <p>{selected.description}</p>
          {selected.deadline && <p>Deadline: {selected.deadline}</p>}
          <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StudentProjectsPage;
