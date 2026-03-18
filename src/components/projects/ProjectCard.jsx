const ProjectCard = ({ project, onClick }) => (
  <div className="card" onClick={() => onClick && onClick(project)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <h3>{project.title || project.name}</h3>
    <p>{project.description}</p>
    {project.deadline && <small>Deadline: {project.deadline}</small>}
  </div>
);

export default ProjectCard;
