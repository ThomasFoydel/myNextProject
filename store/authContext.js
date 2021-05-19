import { createContext } from 'react';

const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function logout() {
    setIsLoggedIn(false);
    setToken(null);
  }
  const context = { token, isLoggedIn, setToken, setIsLoggedIn, logout };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
