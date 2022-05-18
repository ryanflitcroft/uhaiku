import { createContext, useState } from 'react';
import { getUser, signIn, signUp, signOut } from '../services/fetch-utils';

export const authContext = createContext();

export function AuthProvider({ children }) {
  const currentUser = getUser();
  console.log('currentUser', currentUser);
  const [user, setUser] = useState(currentUser || { email: null });
  const [newUser, setNewUser] = useState(false);

  const authorizeUser = async (email, password, username) => {
    if (!newUser) {
      const authenticatedUser = await signIn(email, password);
      setUser(authenticatedUser);
    } else {
      const authenticatedUser = await signUp(email, password, username);
      setUser(authenticatedUser);
    }
  };

  const signOutUser = async () => {
    await signOut();
  };

  const authState = {
    user,
    setUser,
    newUser,
    setNewUser,
    authorizeUser,
    signOutUser,
  };

  return (
    <authContext.Provider value={authState}>{children}</authContext.Provider>
  );
}