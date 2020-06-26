import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import { timeManipulator } from '../utils';
import { fetchSinglePost, fetchComments } from '../actions';

const useStyles = makeStyles((theme) => ({
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
}));

const TimeTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.grey[900],
  },
}))(Tooltip);

const comment = (ids) => {
  return ids.map((id) => {
    return (
      <>
        <div key={id.id} dangerouslySetInnerHTML={{ __html: id.text }}></div>
        {id.kids && comment(id.kids)}
      </>
    );
  });
};

const ContentPage = ({ content }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [text, setText] = useState(null);
  const [manipulatedTime, setManipulatedTime] = useState(null);
  const [tooltipTime, setTooltipTime] = useState(null);
  const comments = useSelector((state) => state.posts.comments);
  const post = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      // fetch('https://hacker-news.firebaseio.com/v0/item/121003.json')
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     setItem(data);
      //     const t = timeManipulator(data.time);
      //     setManipulatedTime(t.manipulatedTime);
      //     setTooltipTime(t.tooltipTime);
      //   });

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
      <div>
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
            <Typography variant="body2">{comment(post.kids)}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <div>...</div>;
  }
};

export default ContentPage;
