import { useState, createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
});

export function AuthContextProvider({ children }) {
  const [authOpen, setAuthOpen] = useState(false);
  const context = {
    authOpen,
    setAuthOpen,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
