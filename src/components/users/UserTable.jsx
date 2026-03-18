import { useState } from 'react';
import ConfirmModal from '../common/ConfirmModal';

const UserTable = ({ users, onDelete, showDelete }) => {
  const [confirmId, setConfirmId] = useState(null);

  return (
    <>
      {confirmId && (
        <ConfirmModal
          message="Are you sure you want to delete this user?"
          onConfirm={() => { onDelete(confirmId); setConfirmId(null); }}
          onCancel={() => setConfirmId(null)}
        />
      )}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th>
            {showDelete && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td><span className="role-badge">{u.role}</span></td>
              {showDelete && (
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => setConfirmId(u.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
