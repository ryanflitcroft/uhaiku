import { createContext, useState } from 'react';
import { getUser } from '../services/fetch-utils';

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null });
  const [newUser, setNewUser] = useState(false);
  const [profile, setProfile] = useState(null);

  const authState = {
    user,
    setUser,
    newUser,
    setNewUser,
    profile,
    setProfile,
  };

  return (
    <authContext.Provider value={authState}>{children}</authContext.Provider>
  );
}
