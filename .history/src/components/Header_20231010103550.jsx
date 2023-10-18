import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Your App Name
          </Link>
        </Typography>
        <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex' }}>
          <li style={{ margin: '0 16px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              MainPage
            </Link>
          </li>
          <li style={{ margin: '0 16px' }}>
            <Link to="/chart" style={{ textDecoration: 'none', color: 'inherit' }}>
              Chart
            </Link>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
