import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ContentPage from './components/ContentPage';

function App() {
  return (
    <>
      <Switch>
        <Route path="/item/:id">
          <ContentPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
