import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography>
          <Link href="/" style={{ color: 'inherit' }} underline="none">
            HackerNews Clone
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
