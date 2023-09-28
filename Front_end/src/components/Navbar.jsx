import * as React from 'react';
//import { Box, TextField, Button, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import { navButton } from '../MUIStyles';

const pages = [{link: '/', label: 'Home'}, {link: '/about/', label: 'About'}, {link: '/browse/', label: 'Projects'}, {link: '/learn/', label: 'Learn skills'},{link: '/sign-in/', label: 'Self'}];

// see https://mui.com/material-ui/react-app-bar/
function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{backgroundColor:"#64732C"}}>
      <Box marginLeft={"2rem"}>
        <Toolbar disableGutters>

          {/* desktop menu logo and icon */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={navButton}
          >
            Eovia
          </Typography>

          {/* mobile menu items in a flexbox */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
              <MenuIcon />
            </IconButton>            
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
              ))}
            </Menu>
          </Box>

          {/* desktop menu items are here, grouped into a flex box */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* render our menu items as NavLinks to make sure we maintain state */}
            {pages.map((page) => (
                <MenuItem key={page.link} component={NavLink} to={page.link}>{page.label}</MenuItem>
            ))}
          </Box>

        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default NavBar;
