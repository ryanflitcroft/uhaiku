import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navigation() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { signOutUser } = useAuth();

  async function handleLogout() {
    await signOutUser();
    
    history.replace('/auth');
  }

  return (
    <nav>
      <ul>
        {(pathname !== '/')
          &&
          <li>
            <NavLink to='/'>
              Home
            </NavLink>
          </li>
        }
        {(pathname !== '/haiku/create')
          &&
          <li>
            <NavLink to='/haiku/create'>
              Create
            </NavLink>
          </li>
        }
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
      </ul>
    </nav>
  )
}
