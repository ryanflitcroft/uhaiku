import { createContext, useState } from 'react';
import { getUser, signIn, signUp } from '../services/fetch-utils';

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null });
  const [newUser, setNewUser] = useState(false);
  const [profile, setProfile] = useState(null);

  const authorizeUser = async (email, password, username) => {
    if (!newUser) {
      const authenticatedUser = await signIn(email, password);
      setUser(authenticatedUser);
    } else {
      const authenticatedUser = await signUp(email, password, username);
      setUser(authenticatedUser);
    }
  };


  const authState = {
    user,
    setUser,
    newUser,
    setNewUser,
    authorizeUser,
    profile,
    setProfile
  };

  return (
    <authContext.Provider value={authState}>{children}</authContext.Provider>
  );
}
