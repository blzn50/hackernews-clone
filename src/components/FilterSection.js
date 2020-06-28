import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { fetchPostIDs } from '../actions';

const useStyles = makeStyles((theme) => ({
  desktopSection: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  filterType: {
    padding: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  mobileFilter: {
    padding: 0,
    paddingRight: 10,
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    width: 'auto',
    borderRadius: 4,
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  filterIcon: {
    paddingLeft: theme.spacing(2),
    minWidth: 40,
  },
  mobileSection: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  dropdownIcon: {
    minWidth: 0,
  },
  dropdownMenu: {
    '& ul': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  dropdownMenuItem: {
    paddingTop: 0,
    paddingBottom: 0,
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      fontWeight: 500,
    },
    '& .MuiListItemIcon-root': {
      paddingLeft: 0,
      minWidth: 40,
    },
  },
}));

const filterOptions = ['Top', 'Best', 'New'];
const filterIcons = [<VerticalAlignTopIcon />, <WhatshotIcon />, <NewReleasesIcon />];

const FilterSection = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      switch (selectedIndex) {
        case 1:
          dispatch(fetchPostIDs('beststories'));
          break;
        case 2:
          dispatch(fetchPostIDs('newstories'));
          break;
        default:
        case 0:
          dispatch(fetchPostIDs('topstories'));
          break;
      }
    })();
  }, [selectedIndex, dispatch]);

  const handleFiltering = (e, i) => {
    if (selectedIndex === i) {
      return;
    }
    setSelectedIndex(i);
    setAnchorEl(null);
  };

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <List component="nav" className={classes.desktopSection}>
        {filterOptions.map((f, i) => (
          <ListItem
            key={f}
            button
            disableRipple
            className={classes.filterType}
            selected={selectedIndex === i}
            onClick={(e) => handleFiltering(e, i)}
          >
            <ListItemIcon className={classes.filterIcon}>{filterIcons[i]}</ListItemIcon>
            <ListItemText primary={f}></ListItemText>
          </ListItem>
        ))}
      </List>
      <div className={classes.mobileSection}>
        <List component="nav">
          <ListItem
            button
            disableRipple
            className={classes.mobileFilter}
            aria-haspopup="true"
            aria-controls="lock-menu"
            onClick={handleClickListItem}
          >
            <ListItemIcon className={classes.filterIcon}>{filterIcons[selectedIndex]}</ListItemIcon>
            <ListItemText primary={filterOptions[selectedIndex]}></ListItemText>
            <ListItemIcon className={classes.dropdownIcon}>
              <ArrowDropDownIcon />
            </ListItemIcon>
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          className={classes.dropdownMenu}
          getContentAnchorEl={null}
        >
          {filterOptions.map((f, i) => (
            <MenuItem
              className={classes.dropdownMenuItem}
              key={f}
              selected={i === selectedIndex}
              onClick={(e) => handleFiltering(e, i)}
            >
              <ListItemIcon>{filterIcons[i]}</ListItemIcon>
              <ListItemText primary={f}></ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Card>
  );
};

export default FilterSection;
