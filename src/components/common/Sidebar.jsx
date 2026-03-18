import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/roleHelper';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/teams', label: 'Teams' },
  { to: '/admin/templates', label: 'Templates' },
];

const teacherLinks = [
  { to: '/teacher/dashboard', label: 'Dashboard' },
  { to: '/teacher/assigned-teams', label: 'Assigned Teams' },
  { to: '/teacher/evaluations', label: 'Evaluations' },
];

const studentLinks = [
  { to: '/student/dashboard', label: 'Dashboard' },
  { to: '/student/projects', label: 'Projects' },
  { to: '/student/teams', label: 'My Teams' },
  { to: '/student/marks', label: 'My Marks' },
  { to: '/student/create-team', label: 'Create Team' },
  { to: '/student/join-team', label: 'Join Team' },
];

const Sidebar = () => {
  const { user } = useAuth();
  let links = [];
  if (user?.role === ROLES.MAIN_TEACHER) links = adminLinks;
  else if (user?.role === ROLES.TEACHER) links = teacherLinks;
  else if (user?.role === ROLES.STUDENT) links = studentLinks;

  return (
    <aside className="sidebar">
      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
