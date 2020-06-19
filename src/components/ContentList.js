import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchAdditionalPosts } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Content from './Content';
import Loading from './Loading';
import useIntersect from '../useIntersectionObserver';

const useStyles = makeStyles((theme) => ({
  loadingDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const contentsPerPage = 12;

const ContentList = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.posts.loading);
  const miniLoading = useSelector((state) => state.posts.miniLoading);
  const contents = useSelector((state) => state.posts.postIDs);
  const dispatch = useDispatch();
  const sliced = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  const [prevY, setPrevY] = useState(0);
  const [firstValue, setFirstValue] = useState(0);

  const [ref, entry] = useIntersect({});
  // console.log('entry: ', entry);

  useEffect(() => {
    const slicedContents = contents.slice(0, contentsPerPage);
    dispatch(fetchPosts(slicedContents));
    setFirstValue((f) => f + 13);
  }, [dispatch, contents]);

  useEffect(() => {
    (() => {
      if (entry.boundingClientRect) {
        let y = entry.boundingClientRect.y;
        if (prevY > y) {
          const additionalSlicedContents = contents.slice(firstValue, firstValue + contentsPerPage);
          console.log('firstValue: ', firstValue);
          dispatch(fetchAdditionalPosts(additionalSlicedContents));
          setFirstValue((f) => f + 13);
        }
        setPrevY(y);
      }
    })();
  }, [firstValue, entry]);

  return (
    <div>
      {loading ? (
        <div className={classes.loadingDiv}>
          <Loading />
        </div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          {sliced.map((c) => (
            <Content key={c.id} content={c} />
          ))}
          <div ref={ref} style={{ height: '3rem' }}></div>
          {miniLoading ? <Loading></Loading> : ''}
        </>
      )}
    </div>
  );
};

export default ContentList;
