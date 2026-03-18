import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRoleHome } from '../../utils/roleHelper';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (user) navigate(getRoleHome(user.role)); }, [user, navigate]);
  return <LoginForm />;
};

export default LoginPage;
