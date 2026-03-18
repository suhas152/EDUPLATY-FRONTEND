import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import GalaxyBackground from './components/common/GalaxyBackground';
import './styles/galaxy.css';
import './styles/global.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/forms.css';
import './styles/tables.css';
import './styles/cards.css';

const App = () => (
  <AuthProvider>
    <GalaxyBackground />
    <AppRouter />
  </AuthProvider>
);

export default App;
