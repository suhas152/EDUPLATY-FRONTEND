import { useState } from 'react';
import ConfirmModal from '../common/ConfirmModal';

// team.memberIds and team.memberNames are parallel arrays from TeamDTO
const TeamMembersList = ({ memberIds, memberNames, teamId, onRemove, showRemove }) => {
  const [confirmId, setConfirmId] = useState(null);
  const ids = memberIds || [];
  const names = memberNames || [];

  return (
    <>
      {confirmId && (
        <ConfirmModal
          message="Remove this member from the team?"
          onConfirm={() => { onRemove(teamId, confirmId); setConfirmId(null); }}
          onCancel={() => setConfirmId(null)}
        />
      )}
      <ul className="member-list">
        {ids.length === 0 && <li className="member-item"><span>No members</span></li>}
        {ids.map((id, i) => (
          <li key={id} className="member-item">
            <span>{names[i] || `Member #${id}`}</span>
            {showRemove && (
              <button className="btn btn-danger btn-sm" onClick={() => setConfirmId(id)}>Remove</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TeamMembersList;
