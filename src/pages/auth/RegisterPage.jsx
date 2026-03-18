import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRoleHome } from '../../utils/roleHelper';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (user) navigate(getRoleHome(user.role)); }, [user, navigate]);
  return <RegisterForm />;
};

export default RegisterPage;
