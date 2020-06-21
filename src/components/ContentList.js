import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchAdditionalPosts, endFetchLoading } from '../actions';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
  refContainer: {
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);',
    borderRadius: 0,
    backgroundColor: '#fafafa',
    padding: 39,
    height: '100%',
  },
  refLoaderHide: {
    display: 'none',
  },
}));

const contentsPerPage = 12;

const ContentList = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.posts.loading);
  const miniLoading = useSelector((state) => state.posts.miniLoading);
  const endOfPage = useSelector((state) => state.posts.endOfPage);
  const contents = useSelector((state) => state.posts.postIDs);
  const dispatch = useDispatch();
  const sliced = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  const [prevY, setPrevY] = useState(0);
  const [firstValue, setFirstValue] = useState(0);

  const [ref, entry, setEndOfContents] = useIntersect({});

  useEffect(() => {
    setFirstValue(0);
    setPrevY(0);
    (() => {
      const slicedContents = contents.slice(0, contentsPerPage);
      dispatch(fetchPosts(slicedContents));
      setFirstValue((f) => f + 13);
    })();
  }, [dispatch, contents]);

  useEffect(() => {
    (() => {
      if (entry.boundingClientRect) {
        let y = entry.boundingClientRect.y;
        if (prevY > y) {
          let tempVal = firstValue;
          if (firstValue > contents.length) {
            dispatch(endFetchLoading());
            setEndOfContents(true);
          } else {
            const additionalSlicedContents = contents.slice(tempVal, tempVal + contentsPerPage);
            dispatch(fetchAdditionalPosts(additionalSlicedContents));
            setFirstValue((f) => f + contentsPerPage);
          }
        }
        setPrevY(y);
      }
    })();
  }, [dispatch, entry, setEndOfContents]);

  console.log('firstValue: ', firstValue);
  console.log('posts count:', sliced.length);

  return (
    <div>
      {loading ? (
        <div className={classes.loadingDiv}>
          <Loading type={'circular'} />
        </div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          {sliced.map((c) => (
            <Content key={c.id} content={c} />
          ))}
          <div ref={ref} className={clsx(classes.refContainer, endOfPage && classes.refLoaderHide)}>
            {/* <Card style={{ backgroundColor: '#fafafa', borderRadius: 0 }}>
            </Card> */}

            {miniLoading ? <Loading type={'additional-dummy'}></Loading> : ''}
          </div>
        </>
      )}
    </div>
  );
};

export default ContentList;
