import React, { useState, useEffect } from 'react';
import day from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  scoreBigScreen: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.8rem',
      backgroundColor: theme.palette.grey[100],
      minWidth: '11vh',
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
  },
  titleSection: {
    display: 'flex',
    flexWrap: 'wrap',
    wordBreak: 'break-word',
    overflow: 'hidden',
  },
  title: {
    fontSize: '0.9rem',
    display: 'inline',
    fontWeight: 500,
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
  commentBigScreen: {
    color: theme.palette.grey.A700,
    fontSize: '0.8rem',
  },
}));

const Content = ({ content }) => {
  const classes = useStyles();
  const [alteredUrl, setAlteredUrl] = useState('');
  const [fixedDateTime, setFixedDateTime] = useState('');

  useEffect(() => {
    // manipulating date/time e.g. 2 minutes ago, 5 hours ago
    const convertedDate = day.unix(content.time);
    const now = day();

    (() => {
      const minute = now.diff(convertedDate, 'minute');
      const hour = now.diff(convertedDate, 'hour');
      const day = now.diff(convertedDate, 'day');
      if (minute < 60) {
        if (minute < 2) {
          setFixedDateTime(`${minute} minute`);
        } else {
          setFixedDateTime(`${minute} minutes`);
        }
      } else if (hour < 24) {
        if (hour === 1) {
          setFixedDateTime(`1 hour`);
        } else {
          setFixedDateTime(`${hour} hours`);
        }
      } else if (day < 365) {
        if (day === 1) {
          setFixedDateTime('1 day');
        } else {
          setFixedDateTime(`${day} days`);
        }
      }
    })();

    // url manipulator e.g. https://www.github.com/rosediii => www.github.com/rosedi...
    (() => {
      if (content.url) {
        const { url } = content;
        // might need to check for 'https://'
        // TODO for later
        const b = url.split('//')[1]; // remove 'http(s)://'
        const [first, ...rest] = b.split('/');
        const d = [first, rest.length > 0 ? rest.join('/') : null];
        console.log('d: ', d);
        if (d[1] !== null) {
          const e = d[1].slice(0, 6);
          const f = e.concat('...');
          const g = d[0].concat(`/${f}`);
          console.log('g: ', g);
          setAlteredUrl(g);
        } else {
          setAlteredUrl(d[0]);
        }
      }
    })();
  }, [content]);

  return (
    <Card className={classes.card}>
      {/* <div>{content.id}</div> */}
      <div className={classes.scoreBigScreen}>
        <Typography variant="subtitle2">
          {content.score} point{content.score < 2 ? '' : 's'}
        </Typography>
      </div>
      <div className={classes.allContents}>
        <div>
          <div className={classes.titleSection}>
            <Typography variant="body2">
              <span className={classes.title}>{content.title}</span>
              {content.type === 'story' ? (
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
                {content.score} point{content.score < 2 ? '' : 's'} &middot;{' '}
              </Hidden>
              <Hidden smUp>
                {content.descendants} comment{content.descendants < 2 ? '' : 's'} &middot;{' '}
              </Hidden>
              <span>Posted by {content.by} &middot; </span>
              <span>{fixedDateTime} ago</span>
              <span></span>
              {/* {`\u00b7`} // middot in utf-8 format */}
            </Typography>
          </CardContent>
        </div>
        <div>
          <Hidden xsDown>
            <Button className={classes.commentBigScreen} component="a" startIcon={<CommentIcon />}>
              {content.descendants}
            </Button>
          </Hidden>
        </div>
      </div>
    </Card>
  );
};

export default Content;
