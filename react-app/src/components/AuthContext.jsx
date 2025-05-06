import { createContext, useContext, useEffect, useState } from 'react';
import { account, functions } from '../appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getUser = async () => {
        try {
          const loggedInUser = await account.get();
          setUser(loggedInUser);

        } catch (err) {
          setUser(null);

        } finally {
          setLoading(false);
        }
      };
  
      getUser();
    }, []);
  
    const loginWithGoogle = async () => {
      try {
        await account.createOAuth2Session(
          'google',
          'http://localhost:3000/',
          'http://localhost:3000/failure'
        );
      } catch (err) {
        console.error('Login failed', err);
      }
    };
  
    const logout = async () => {
      try {
        await account.deleteSession('current');
        setUser(null);
      } catch (err) {
        console.error('Logout failed', err);
      }
    };
  
    return (
      <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => useContext(AuthContext);