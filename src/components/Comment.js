import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { timeManipulator } from '../utils';
import TimeTooltip from './TimeTooltip';

const useStyles = makeStyles((theme) => ({
  commentDiv: {
    margin: '16px 0',
  },
  caption: {
    fontSize: '0.68rem',
    color: '#747474',
  },
  span: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  commentText: {
    margin: '8px 0',
    lineHeight: '1.3',
    wordWrap: 'break-word',
  },
  innerComment: {
    paddingLeft: theme.spacing(3),
    borderLeft: '2px solid #beb9b9',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 14,
      borderLeft: '1px solid #dad4d4',
    },
  },
}));

const Comment = ({ comments }) => {
  const classes = useStyles();
  return comments.map((comment) => {
    return (
      <div className={classes.commentDiv} key={comment.id}>
        <Typography variant="caption" className={classes.caption}>
          <span className={classes.span}>{comment.by}</span>
          <span> &middot; </span>
          <TimeTooltip title={timeManipulator(comment.time).tooltipTime} placement="top">
            <span className={classes.span}>
              {timeManipulator(comment.time).manipulatedTime} ago
            </span>
          </TimeTooltip>
        </Typography>
        <Typography
          variant="body2"
          className={classes.commentText}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        ></Typography>
        {comment.kids && (
          <div className={classes.innerComment}>
            <Comment comments={comment.kids} />
          </div>
        )}
      </div>
    );
  });
};

export default Comment;
