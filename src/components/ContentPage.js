import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';
import { timeManipulator } from '../utils';

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

const ContentPage = () => {
  const classes = useStyles();
  const [item, setItem] = useState(null);
  const [text, setText] = useState(null);
  const [manipulatedTime, setManipulatedTime] = useState(null);
  const [tooltipTime, setTooltipTime] = useState(null);

  useEffect(() => {
    (() => {
      fetch('https://hacker-news.firebaseio.com/v0/item/121003.json')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setItem(data);
          const t = timeManipulator(data.time);
          setManipulatedTime(t.manipulatedTime);
          setTooltipTime(t.tooltipTime);
        });
    })();
  }, []);

  if (item !== null) {
    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.titleSection}>
            <Typography variant="h6" className={classes.title}>
              {item.url ? (
                <Link
                  underline="none"
                  color="inherit"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{item.title}</span>
                  <OpenInNewRoundedIcon fontSize="small" />
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              <span>
                {item.score} point{item.score < 2 ? '' : 's'} &middot;{' '}
              </span>
              <span>
                {item.descendants} comment{item.descendants < 2 ? '' : 's'} &middot;{' '}
              </span>
              <span>Posted by </span>
              <span className={classes.span}>{item.by}</span>
              <span> &middot;</span>
              {tooltipTime && (
                <TimeTooltip title={tooltipTime} placement="top">
                  <span className={classes.span}>{manipulatedTime} ago</span>
                </TimeTooltip>
              )}
              <span></span>
            </Typography>
          </div>
          <CardContent>
            <Typography className={classes.titleMoreText} variant="body2">
              <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <div>...</div>;
  }
};

export default ContentPage;
