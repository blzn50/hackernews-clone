import React, { useState, useEffect } from 'react';
import day from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import LaunchIcon from '@material-ui/icons/Launch';

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
      padding: '1rem',
      backgroundColor: theme.palette.grey[100],
    },
  },
  allContents: {
    padding: '0.4rem 0.8rem',
  },
  titleSection: {
    display: 'inline-block',
  },
  title: {
    fontSize: '1.1rem',
  },
  insideContents: {
    padding: '0 !important',
  },
}));

const Content = ({ content }) => {
  const classes = useStyles();
  const [fixedDateTime, setFixedDateTime] = useState('');
  const convertedDate = day.unix(content.time);
  const now = day();

  useEffect(() => {
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
  }, []);

  return (
    <Card className={classes.card}>
      {/* <div>{content.id}</div> */}
      <div className={classes.scoreBigScreen}>
        <Typography variant="subtitle2">{content.score} points</Typography>
      </div>
      <div className={classes.allContents}>
        <div>
          <div className={classes.titleSection}>
            <Typography>
              <Link className={classes.title} href={content.url} variant="h6">
                {content.title}
              </Link>
              {content.type === 'story' ? (
                <IconButton size="small">
                  <LaunchIcon fontSize="small" />
                </IconButton>
              ) : (
                ''
              )}
            </Typography>
          </div>
          <CardContent className={classes.insideContents}>
            <Typography variant="caption" color="textSecondary">
              {`Posted by ${content.by} \u00b7 ${fixedDateTime} ago`}
            </Typography>
          </CardContent>
        </div>
        <div>{content.descendants}</div>
      </div>
    </Card>
  );
};

export default Content;
