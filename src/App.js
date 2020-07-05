import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import Home from './components/Home';
import ContentPage from './components/ContentPage';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.only('xs')]: {
      flexWrap: 'nowrap',
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container} direction="column">
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
