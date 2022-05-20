import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navigation() {
  const { pathname } = useLocation();

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
            <button>Logout</button>
          </li>
      </ul>
    </nav>
  )
}
