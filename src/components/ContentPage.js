import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNewRounded';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    padding: theme.spacing(2),
  },
  titleSection: {
    marginTop: '1rem',
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
}));

const ContentPage = () => {
  const classes = useStyles();
  const [item, setItem] = useState(null);

  useEffect(() => {
    (() => {
      fetch('https://hacker-news.firebaseio.com/v0/item/23489068.json')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setItem(data);
          console.log(dayjs(data.time).toDate());
        });
    })();
  }, []);
  if (item !== null) {
    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.titleSection}>
            <Typography variant="h6" className={classes.title}>
              {item.type === 'story' ? (
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
              <span>Posted by {item.by} &middot; </span>
              {/* <span>{fixedDateTime} ago</span> */}
              <span></span>
              {/* {`\u00b7`} // middot in utf-8 format */}
              {dayjs(item.time).toDate().toString()}
            </Typography>
          </div>
          <CardContent></CardContent>
        </Card>
      </div>
    );
  } else {
    return <div>...</div>;
  }
};

export default ContentPage;
