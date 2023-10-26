import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

interface HeaderProps {
  backgroundColor: string;
  isSticky: boolean;
}

interface AppBarStyle {
  backgroundColor: string;
  position: 'static' | 'sticky';
  top: number;
}

const Header: React.FC<HeaderProps> = ({ backgroundColor, isSticky }) => {
  const appBarStyle: AppBarStyle = {
    backgroundColor,
    position: isSticky ? 'sticky' : 'static',
    top: 0
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
  };

  const menuIconStyle = {
    color: 'white'
  };

  return (
    <AppBar position="static" style={appBarStyle}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon style={menuIconStyle} />
        </IconButton>
        <Typography variant="h6">
          <Link to="/" style={linkStyle}>
            Rick and Morty
          </Link>
        </Typography>
        <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex' }}>
          <li style={{ margin: '0 16px' }}>
            <Link to="/" style={{ ...linkStyle }}>
              MainPage
            </Link>
          </li>
          <li style={{ margin: '0 16px' }}>
            <Link to="/chart" style={linkStyle}>
              Chart
            </Link>
          </li>
          <li style={{ margin: '0 16px' }}>
            <Link to="/storybook" style={linkStyle}>
              Storybook
            </Link>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
