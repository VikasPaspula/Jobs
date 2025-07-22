import { createContext, useContext, useState, useEffect } from 'react';

// Dynamically set backend URL
const apiBaseUrl = window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:8000'
  : 'https://jobs-backend-uuqf.onrender.com';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  // Optionally fetch user info after login
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await fetch(`${apiBaseUrl}/api/profile/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            logout(); // invalid token
          }
        } catch (err) {
          console.error("Error fetching user profile", err);
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
