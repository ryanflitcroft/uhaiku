import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header() {
  const { pathname } = useLocation();
  
  return (
    <>
      <header>
        <h1>uhaiku</h1>
        {(pathname !== '/auth')
          &&
          <Navigation />
        }
      </header>
    </>
  );
}
