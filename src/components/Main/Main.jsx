import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Auth from '../Auth/Auth';
import HaikuList from '../HaikuList/HaikuList';
import HaikuDetail from '../HaikuDetail/HaikuDetail';
import CreateHaiku from '../CreateHaiku/CreateHaiku';

export default function Main() {
  return (
    <>
      <main>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <PrivateRoute path="/haiku/:id">
            <HaikuDetail />
          </PrivateRoute>
          <PrivateRoute path="/haiku/create">
            <CreateHaiku />
          </PrivateRoute>
          <PrivateRoute exact path="/">
            <HaikuList />
          </PrivateRoute>
        </Switch>
      </main>
    </>
  );
}
