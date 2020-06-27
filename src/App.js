import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import Home from './components/Home';
import ContentPage from './components/ContentPage';

function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>

      <Switch>
        <Route path="/item/:id">
          <ContentPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Grid>
  );
}

export default App;
