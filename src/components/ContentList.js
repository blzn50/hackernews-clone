import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchAdditionalPosts, endFetchLoading, endEOP } from '../actions';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
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
    height: '16vh',
    padding: 1,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);',
    borderRadius: 0,
    background: '#fafafa',
  },
  refLoaderHide: {
    display: 'none',
  },
}));

const ContentList = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.posts.loading);
  const miniLoading = useSelector((state) => state.posts.miniLoading);
  const endOfPage = useSelector((state) => state.posts.endOfPage);
  const refClose = useSelector((state) => state.posts.refClose);
  const contents = useSelector((state) => state.posts.postIDs);
  const sliced = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);
  const dispatch = useDispatch();

  const [prevY, setPrevY] = useState(null);
  const [firstValue, setFirstValue] = useState(null);

  const [ref, entry] = useIntersect({});

  useEffect(() => {
    setFirstValue(0);
    setPrevY(0);

    (() => {
      const slicedContents = contents.slice(0, Number(process.env.REACT_APP_ITEM_PER_PAGE));
      dispatch(fetchPosts(slicedContents));
      setFirstValue((f) => f + Number(process.env.REACT_APP_ITEM_PER_PAGE) + 1);
    })();
  }, [dispatch, contents]);

  useEffect(() => {
    (() => {
      if (entry.boundingClientRect) {
        let y = entry.boundingClientRect.y;

        if (prevY > y) {
          if (firstValue > contents.length) {
            dispatch(endFetchLoading());
          } else {
            let tempVal = firstValue;
            const additionalSlicedContents = contents.slice(
              tempVal,
              tempVal + Number(process.env.REACT_APP_ITEM_PER_PAGE)
            );
            dispatch(fetchAdditionalPosts(additionalSlicedContents));
            setFirstValue((f) => f + Number(process.env.REACT_APP_ITEM_PER_PAGE));
          }
        }
        setPrevY(y);
      }
    })();
  }, [dispatch, entry, firstValue, prevY, contents]);

  return (
    <div>
      {loading ? (
        <div className={classes.loadingDiv}>
          <Loading type={'circular'} />
        </div>
      ) : error ? (
        <div>
          <Snackbar open={endOfPage} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert elevation={6} variant="filled" severity="error">
              We had some trouble reaching the hackernews server!
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <>
          {sliced.map((c) => (
            <Content key={c.id} content={c} />
          ))}
          <div ref={ref} className={clsx(classes.refContainer, refClose && classes.refLoaderHide)}>
            {miniLoading ? <Loading type={'additional-dummy'}></Loading> : ''}
          </div>
          <Snackbar
            open={endOfPage}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={2500}
            onClose={() => dispatch(endEOP())}
            TransitionComponent={(props) => <Slide {...props} />}
          >
            <Alert elevation={6} variant="filled" severity="info">
              Hmm... Looks like there are no more contents to load.
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default ContentList;
