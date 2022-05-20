import { useContext } from 'react';
import { authContext } from '../context/AuthProvider';
import { getProfileById, signOut } from '../services/fetch-utils';

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
    profile,
    setProfile,
  } = context;

  const getProfile = async (id) => {
    const profile = await getProfileById(id);

    setProfile(profile.username);
  }

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
    profile,
    getProfile
  };
};
