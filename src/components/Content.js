import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import { timeManipulator } from '../utils';
import TimeTooltip from './TimeTooltip';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      borderBottom: '0.15rem solid #dcdcdc',
    },
  },
  scoreBigScreen: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.8rem',
      backgroundColor: theme.palette.grey[100],
      minWidth: '5rem',
    },
  },
  allContents: {
    padding: '0.4rem 0.8rem',
    display: 'flex',
    flex: '1 1 auto',
    '& > div': {
      flex: '1 1 100%',
    },
    '& > div:nth-child(2)': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0.85rem',
    },
  },
  titleSection: {
    display: 'flex',
    flexWrap: 'wrap',
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  title: {
    fontSize: '0.95rem',
    display: 'inline',
    fontWeight: 500,
    color: 'inherit',
  },
  storyUrl: {
    fontSize: 12,
    margin: '4px 8px',
    whiteSpace: 'nowrap',
    '& .MuiSvgIcon-root': {
      fontSize: '0.8rem',
      verticalAlign: 'middle',
      paddingLeft: 3,
      position: 'relative',
      bottom: 1,
    },
  },
  insideContents: {
    padding: '0 !important',
  },
  mobileScoreComments: {
    fontSize: '0.8rem',
  },
  commentBigScreen: {
    color: theme.palette.grey.A700,
    fontSize: '0.8rem',
  },
  commentLink: {
    color: 'inherit',
    '& .MuiSvgIcon-root': {
      fontSize: '1rem',
      verticalAlign: 'middle',
      paddingLeft: 3,
      paddingRight: 3,
      position: 'relative',
      bottom: 1,
    },
  },
  span: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  middot: {
    '&::after': {
      content: "'\\2022'",
      color: 'rgba(0, 0, 0, 0.54)',
      display: 'inline-block',
      margin: '0 4px',
      position: 'relative',
      verticalAlign: 'middle',
    },
  },
}));

const Content = ({ content }) => {
  const classes = useStyles();
  const [alteredUrl, setAlteredUrl] = useState('');
  const { manipulatedTime, tooltipTime } = timeManipulator(content.time);

  useEffect(() => {
    // url manipulator e.g. https://www.github.com/rosediii => www.github.com/rosedi...
    (() => {
      if (content.url) {
        const { url } = content;
        // might need to check for 'https://'
        // TODO for later
        const b = url.split('//')[1]; // remove 'http(s)://'
        const [first, ...rest] = b.split('/');
        const d = [first, rest.length > 0 ? rest.join('/') : null];
        if (d[1] !== null) {
          const e = d[1].slice(0, 6);
          const f = e.concat('...');
          const g = d[0].concat(`/${f}`);
          setAlteredUrl(g);
        } else {
          setAlteredUrl(d[0]);
        }
      }
    })();
  }, [content]);

  return (
    <Card className={classes.card}>
      <div className={classes.scoreBigScreen}>
        <Typography variant="subtitle2">
          {content.score} point{content.score < 2 ? '' : 's'}
        </Typography>
      </div>
      <div className={classes.allContents}>
        <div>
          <Hidden smUp>
            <Typography variant="caption" color="textSecondary">
              <span>Posted by </span>
              <span className={classes.span}>{content.by}</span>
              <span className={classes.middot}></span>
              <TimeTooltip title={tooltipTime} placement="top">
                <span className={classes.span}>{manipulatedTime} ago</span>
              </TimeTooltip>
            </Typography>
          </Hidden>
          <div className={classes.titleSection}>
            <Typography variant="body2">
              <Link
                className={classes.title}
                to={`/item/${content.id}`}
                target="__blank"
                component={RouterLink}
              >
                {content.title}
              </Link>
              {content.url ? (
                <Link
                  href={content.url}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.storyUrl}
                >
                  {alteredUrl}
                  <OpenInNewRoundedIcon fontSize="small" />
                </Link>
              ) : (
                ''
              )}
            </Typography>
          </div>
          <CardContent className={classes.insideContents}>
            <Typography variant="caption" color="textSecondary">
              <Hidden smUp>
                <span className={classes.mobileScoreComments}>
                  <span style={{ paddingRight: 4 }}>
                    {content.score} point{content.score < 2 ? '' : 's'}
                  </span>
                  <span className={classes.middot}></span>
                  <Link
                    to={`/item/${content.id}`}
                    component={RouterLink}
                    className={classes.commentLink}
                  >
                    <CommentIcon fontSize="small" />
                    {content.descendants}
                  </Link>
                </span>
              </Hidden>
              <Hidden only="xs">
                <span>Posted by </span>
                <span className={classes.span}>{content.by}</span>
                <span className={classes.middot}></span>
                <TimeTooltip title={tooltipTime} placement="top">
                  <span className={classes.span}>{manipulatedTime} ago</span>
                </TimeTooltip>
              </Hidden>
            </Typography>
          </CardContent>
        </div>
        <div>
          <Hidden xsDown>
            <Button
              to={`/item/${content.id}`}
              className={classes.commentBigScreen}
              component={RouterLink}
              startIcon={<CommentIcon />}
            >
              {content.descendants}
            </Button>
          </Hidden>
        </div>
      </div>
    </Card>
  );
};

export default Content;
