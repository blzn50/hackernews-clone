import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import ForumIcon from '@material-ui/icons/Forum';
import { timeManipulator } from '../utils';
import { fetchSinglePost, fetchComments } from '../actions';
import TimeTooltip from './TimeTooltip';
import Comment from './Comment';

const useStyles = makeStyles((theme) => ({
  contentDiv: {
    backgroundColor: '#d5d5d5',
    paddingTop: '2rem',
    minHeight: 'calc(96vh - 52px)',
  },
  card: {
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(2),
  },
  titleSection: {
    marginTop: '1rem',
    padding: '0 16px',
  },
  title: {
    fontSize: '1.15rem',
    '& .MuiSvgIcon-root': {
      fontSize: '1rem',
      verticalAlign: 'middle',
      paddingLeft: 3,
      position: 'relative',
      bottom: 1,
    },
  },
  titleMoreText: {
    color: 'rgba(50, 50, 50, 0.87)',
    lineHeight: 'inherit',
    borderBottom: '1px solid rgba(233, 232, 232, 0.87)',
    paddingBottom: theme.spacing(2),
  },
  span: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  emptyComments: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    padding: '5rem',
    color: '#a1a1a1',
    fontSize: '1.05rem',
  },
}));

const ContentPage = ({ content }) => {
  const classes = useStyles();
  const { id } = useParams();
  const post = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      if (content) {
        // dispatch(fetchComments(content.id))
        console.log('content');
      } else {
        dispatch(fetchSinglePost(id));
      }
    })();
  }, [dispatch, content, id]);

  if (post !== null) {
    return (
      <div className={classes.contentDiv}>
        <Card className={classes.card}>
          <div className={classes.titleSection}>
            <Typography variant="h6" className={classes.title}>
              {post.url ? (
                <Link
                  underline="none"
                  color="inherit"
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{post.title}</span>
                  <OpenInNewRoundedIcon fontSize="small" />
                </Link>
              ) : (
                <span>{post.title}</span>
              )}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              <span>
                {post.score} point{post.score < 2 ? '' : 's'} &middot;{' '}
              </span>
              <span>
                {post.descendants} comment{post.descendants < 2 ? '' : 's'} &middot;{' '}
              </span>
              <span>Posted by </span>
              <span className={classes.span}>{post.by}</span>
              <span> &middot; </span>
              <TimeTooltip title={timeManipulator(post.time).tooltipTime} placement="top">
                <span className={classes.span}>
                  {timeManipulator(post.time).manipulatedTime} ago
                </span>
              </TimeTooltip>
              <span></span>
            </Typography>
          </div>
          <CardContent>
            <Typography className={classes.titleMoreText} variant="body2">
              <span dangerouslySetInnerHTML={{ __html: post.text }}></span>
            </Typography>
            {post.kids ? (
              <Comment comments={post.kids} />
            ) : (
              <Typography variant="h6" className={classes.emptyComments}>
                <ForumIcon /> No Comments Yet
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className={classes.contentDiv}>
        <Card className={classes.card}>
          <div className={classes.titleSection}>
            <Typography variant="h6" className={classes.title}>
              <span>Title</span>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              <span>METADATA</span>
            </Typography>
          </div>
          <CardContent>
            <Typography className={classes.titleMoreText} variant="body2"></Typography>
            <Typography>Comments</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
};

export default ContentPage;
