import ProjectCard from './ProjectCard';
import EmptyState from '../common/EmptyState';

const ProjectList = ({ projects, onSelect }) => {
  if (!projects?.length) return <EmptyState message="No projects found." />;
  return (
    <div className="card-grid">
      {projects.map((p) => <ProjectCard key={p.id} project={p} onClick={onSelect} />)}
    </div>
  );
};

export default ProjectList;
