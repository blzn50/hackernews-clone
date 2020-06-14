import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Content from './Content';
import FilterSection from './FilterSection';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: '#d5d5d5',
  },
  paper: {
    maxWidth: 800,
    margin: 'auto',
  },
  filterSection: {
    marginBottom: theme.spacing(0),
  },
  contentList: {
    marginTop: theme.spacing(4),
  },
}));
function App() {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid item className={classes.filterSection}>
            <FilterSection />
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid item direction="column" container className={classes.contentList}>
            <Grid item>
              <Content />
            </Grid>
            <Grid item>
              <Content />
            </Grid>
            <Grid item>
              <Content />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Grid>
  );
}

export default App;
