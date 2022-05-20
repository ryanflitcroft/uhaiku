import { useContext } from 'react';
import { authContext } from '../context/AuthProvider';
import { signOut } from '../services/fetch-utils';

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuth must be user within UserProvider');
  }

  const { 
    user,
    setUser,
    newUser,
    setNewUser,
    authorizeUser,
  } = context;


  const signOutUser = async () => {
    await signOut();
  };

  return { 
    signOutUser, 
    user,
    setUser,
    newUser,
    setNewUser,
    authorizeUser, 
  };
};
