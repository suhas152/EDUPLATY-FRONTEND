import { createContext, useContext, useState } from 'react';
import { saveUser, getUser, removeUser } from '../utils/localStorageHelper';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const login = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  const logout = () => {
    removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
