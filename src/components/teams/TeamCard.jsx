// TeamDTO shape: { id, projectId, projectTitle, createdById, createdByName,
//                  status, memberIds[], memberNames[], assignedTeacherId, assignedTeacherName }
const TeamCard = ({ team, onClick }) => (
  <div className="card" onClick={() => onClick && onClick(team)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <h3>Team #{team.id} — {team.projectTitle}</h3>
    <p>Project: {team.projectTitle || '—'}</p>
    <p>Teacher: {team.assignedTeacherName || 'Not assigned'}</p>
    <p>Members: {team.memberNames?.length || 0}</p>
    <p>Status: {team.status}</p>
  </div>
);

export default TeamCard;
