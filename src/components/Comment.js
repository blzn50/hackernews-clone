import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  collapse: {
    '& > span': {
      padding: '0',
      margin: '0 12px',
    },
    '& .MuiSvgIcon-root': {
      marginBottom: 2,
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

const Comment = ({ comment }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleCollapse = () => {
    setOpen(!open);
    // if (index.includes(id)) {
    //   setIndex(index.filter((i) => i !== id));
    // } else {
    //   setIndex([...index, id]);
    // }
    // }
  };

  return (
    <div className={classes.commentDiv} key={comment.id}>
      <Typography variant="caption" className={classes.caption}>
        <span className={classes.span}>{comment.by}</span>
        <span> &middot; </span>
        <TimeTooltip title={timeManipulator(comment.time).tooltipTime} placement="top">
          <span className={classes.span}>{timeManipulator(comment.time).manipulatedTime} ago</span>
        </TimeTooltip>
        <span onClick={handleCollapse} className={classes.collapse}>
          {open ? (
            <IconButton component="span">
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton component="span">
              <ExpandLessIcon fontSize="small" />
            </IconButton>
          )}
        </span>
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography
          variant="body2"
          className={classes.commentText}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        ></Typography>
        {comment.kids &&
          comment.kids.map((kid) => (
            <div className={classes.innerComment} key={kid.id}>
              <Comment comment={kid} />
            </div>
          ))}
      </Collapse>
    </div>
  );
};

export default Comment;
