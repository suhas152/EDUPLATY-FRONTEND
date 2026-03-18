import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">EduPlaty</div>
      <div className="navbar-user">
        <span>{user?.name}</span>
        <span className="role-badge">{user?.role}</span>
        <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
