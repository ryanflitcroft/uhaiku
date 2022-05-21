import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navigation from '../Navigation/Navigation';

export default function Header() {
  const { pathname } = useLocation();
  const { user, getProfile, profile } = useAuth();

  useEffect(() => {
    user.email && getProfile(user?.id);
  }, [user]);

  return (
    <>
      <header>
        <h1>uhaiku</h1>
        {pathname !== '/auth' && (
          <>
            <Navigation />
            <p>{profile}</p>
          </>
        )}
      </header>
    </>
  );
}
