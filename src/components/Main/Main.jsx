import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth';
import HaikuList from '../HaikuList/HaikuList';
import HaikuDetail from '../HaikuDetail/HaikuDetail';
import CreateHaiku from '../CreateHaiku/CreateHaiku';

export default function Main() {
  return (
    <>
      <main>
        <Switch>
          <Route path="/">
            <HaikuList />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/haiku/:id">
            <HaikuDetail />
          </Route>
          <Route path="/haiku/create">
            <CreateHaiku />
          </Route>
        </Switch>
      </main>
    </>
  );
}
