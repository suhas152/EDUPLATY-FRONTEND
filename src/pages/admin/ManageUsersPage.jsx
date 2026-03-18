import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../api/userApi';
import UserTable from '../../components/users/UserTable';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    getAllUsers()
      .then((res) => { setUsers(res.data); setFiltered(res.data); })
      .catch(() => setMsg('Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  useEffect(() => {
    setFiltered(roleFilter === 'ALL' ? users : users.filter((u) => u.role === roleFilter));
  }, [roleFilter, users]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setMsg('User deleted');
      fetchUsers();
    } catch {
      setMsg('Failed to delete user');
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="page-title">Manage Users</h1>
      {msg && <p className="success-msg">{msg}</p>}
      <div className="filter-bar">
        {['ALL', 'MAIN_TEACHER', 'TEACHER', 'STUDENT'].map((r) => (
          <button key={r} className={`btn ${roleFilter === r ? 'btn-primary' : 'btn-outline'}`} onClick={() => setRoleFilter(r)}>{r}</button>
        ))}
      </div>
      {filtered.length ? <UserTable users={filtered} onDelete={handleDelete} showDelete /> : <EmptyState />}
    </div>
  );
};

export default ManageUsersPage;
