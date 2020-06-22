import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import ContentList from './components/ContentList';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: '#d5d5d5',
    minHeight: 'calc(94vh - 52px)',
  },
  rootEOP: {
    paddingBottom: theme.spacing(1.5),
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
  const endOfPage = useSelector((state) => state.posts.endOfPage);

  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <div className={clsx(classes.root, endOfPage && classes.rootEOP)}>
        <Paper className={classes.paper}>
          <Grid item className={classes.filterSection}>
            <FilterSection />
          </Grid>
        </Paper>
        <Paper className={classes.paper} style={{ borderRadius: 0 }}>
          <Grid item direction="column" container className={classes.contentList}>
            <ContentList />
            {/* <Grid item>
              <Content />
            </Grid>
            <Grid item>
              <Content />
            </Grid>
            <Grid item>
              <Content />
            </Grid> */}
          </Grid>
        </Paper>
      </div>
    </Grid>
  );
}

export default App;
