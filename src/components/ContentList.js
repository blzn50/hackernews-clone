import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Content from './Content';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  loadingDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const ContentList = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.posts.loading);
  const contents = useSelector((state) => state.posts.postIDs);
  const dispatch = useDispatch();
  const sliced = useSelector((state) => state.posts.posts);

  useEffect(() => {
    const slicedContents = contents.slice(0, 2);
    dispatch(fetchPosts(slicedContents));
  }, [dispatch, contents]);

  return (
    <div>
      {loading ? (
        <div className={classes.loadingDiv}>
          <Loading />
        </div>
      ) : (
        sliced.map((c) => <Content key={c.id} content={c} />)
      )}
    </div>
  );
};

export default ContentList;
