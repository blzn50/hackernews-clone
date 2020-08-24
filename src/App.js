import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
const Home = lazy(() => import('./components/Home'));
const ContentPage = lazy(() => import('./components/ContentPage'));

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
      <Suspense fallback={<div style={{ background: '#d5d5d5', height: '93vh' }}></div>}>
        <Switch>
          <Route path="/item/:id">
            <ContentPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </Grid>
  );
}

export default App;
