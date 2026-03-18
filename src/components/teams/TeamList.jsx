import TeamCard from './TeamCard';
import EmptyState from '../common/EmptyState';

const TeamList = ({ teams, onSelect }) => {
  if (!teams?.length) return <EmptyState message="No teams found." />;
  return (
    <div className="card-grid">
      {teams.map((t) => <TeamCard key={t.id} team={t} onClick={onSelect} />)}
    </div>
  );
};

export default TeamList;
