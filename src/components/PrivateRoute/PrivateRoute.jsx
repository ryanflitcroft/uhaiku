import React from 'react';
import { Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();

  return (
    <Route 
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: '/auth',
              state: { origin: location },
            }}
          />
        )
      }
    />
  );
}
