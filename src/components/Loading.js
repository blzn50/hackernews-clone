import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@keyframes stretch-delay': {
      '0%, 40%, 100%': {
        transform: 'scaleY(0.4)',
      },
      '20%': {
        transform: 'scaleY(1.0)',
      },
    },
    '@keyframes gradient': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  },
  rectLoader: {
    margin: '20px auto',
    width: 50,
    height: 74,
    textAlign: 'center',
    fontSize: 10,
    '& > div': {
      marginRight: 4,
      backgroundColor: theme.palette.grey[400],
      height: '100%',
      width: 6,
      display: 'inline-block',
      animation: 'stretch-delay 1.2s infinite ease-in-out',
    },
    '& .rect2': {
      animationDelay: '-1.1s',
    },
    '& .rect3': {
      animationDelay: '-1.0s',
    },
    '&  .rect4': {
      animationDelay: '-0.9s',
    },
    '&  .rect5': {
      animationDelay: '-0.8s',
    },
  },
  dummyLoader: {
    background: 'linear-gradient(-45deg, #f1f1f1, #bbb, #f1f1f1, #9c9c9c)',
    backgroundSize: '400% 400%',
    animation: 'gradient 1.5s ease infinite',
    height: '100%',
  },
  commonSingleContentLoader: {
    background: 'linear-gradient(45deg, #f4f4f4, #e5e5e5, #f1f1f1)',
    backgroundSize: '200%',
    margin: '1rem',
    animation: 'gradient 2s ease infinite',
  },
  titleSectionLoader: {
    height: '10vh',
    marginBottom: '2rem',
  },
  dividerLoader: {
    margin: '1rem',
    borderBottom: '1px solid rgba(233, 232, 232, 0.87)',
  },
  commentSectionLoader: {
    height: '25vh',
    marginTop: '2rem',
  },
}));

const Loading = ({ type }) => {
  const classes = useStyles();
  if (type === 'circular') {
    return <CircularProgress />;
  } else if (type === 'additional-dummy') {
    return (
      <div className={classes.rectLoader}>
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );
  } else if (type === 'single-content') {
    return (
      <div>
        <div className={clsx(classes.titleSectionLoader, classes.commonSingleContentLoader)}></div>
        <div className={classes.dividerLoader}></div>
        <div
          className={clsx(classes.commentSectionLoader, classes.commonSingleContentLoader)}
        ></div>
      </div>
    );
  }
};

export default Loading;
