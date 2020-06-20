import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchAdditionalPosts, endFetchLoading } from '../actions';
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
  refContainer: {
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);',
    borderRadius: 0,
    backgroundColor: '#fafafa',
    padding: 1,
    height: '100%',
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
      (() => {
        if (entry.boundingClientRect) {
          let y = entry.boundingClientRect.y;
          // if (firstValue > contents.length) {
          //   setFirstValue(0);
          //   setPrevY(0);
          //   dispatch(endFetchLoading());
          // } else {
          if (prevY > y) {
            let tempVal = firstValue;
            const additionalSlicedContents = contents.slice(tempVal, tempVal + contentsPerPage);
            dispatch(fetchAdditionalPosts(additionalSlicedContents));
            setFirstValue((f) => f + contentsPerPage);
          }
          setPrevY(y);
          // }
        }
      })();
    })();
  }, [dispatch, entry]);

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
          <div ref={ref} className={classes.refContainer}>
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
