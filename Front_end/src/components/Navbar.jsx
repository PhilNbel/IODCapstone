import * as React from 'react';
import { AppBar,Box,Toolbar,IconButton,Typography, Menu, MenuItem, Avatar, Tooltip} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router-dom';
import { navButton } from '../MUIStyles';
import { useUserContext } from '../contexts/UserContext';
import { Button } from '@mui/base';
import { defaultTheme, useMyThemeContext } from '../contexts/MyThemeContext';
import UserAvatar from './UserAvatar';


const pages = [
  {link: '/', label: 'Home'},
  {link: '/projects/', label: 'My projects'},
  {link: '/browse/', label: 'Look for more'},
  {link: '/learn/', label: 'Learn skills'},
  {link: '/about/', label: 'About'}
];

// see https://mui.com/material-ui/react-app-bar/
function NavBar() { 
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let theme = useMyThemeContext()
  let contextUser = useUserContext()
  let currUser = contextUser.currentUser
  let navigate = useNavigate()
  //console.log(currUser)
  
  const settings = [
    {name:'Profile', func:()=>{
      navigate(`/${currUser.nickName}`);
      window.location.reload();
    }},
    {name:'Logout', func:()=>{
      contextUser.handleUpdateUser({});
      theme.updateTheme(defaultTheme)
      handleCloseUserMenu();
    }}
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <AppBar position="sticky" sx={{backgroundColor:"#64732C"}}>
      <Box margin={"0 2rem"} sx={{display:"flex", justifyContent:"space-between"}}>
        <Toolbar disableGutters>

          {/* desktop menu logo and icon */}
          <img alt="E" src="/src/assets/Learn.png" />
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
                display: { xs: 'block', md: 'none' }, margin:"8px 0", padding:0
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={()=>{navigate(page.link);window.location.reload()}} style={{backgroundColor:theme.colors[0], color:theme.colors[1]}}>{page.label}</MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            {pages.map((page) => 
              <Button key={page.link} onClick={()=>{navigate(page.link);window.location.reload()}} style={{...navButton,backgroundColor:theme.colors[0], color:theme.colors[1]}}>
                <Box sx={{}}>
                  {page.label}
                </Box>
              </Button>
            )}
          </Box>  
        </Toolbar>
        <Box>
            { currUser.nickName?
              <>
                <Tooltip title="Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <UserAvatar user={currUser}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px', "& .MuiMenu-paper": 
                  { backgroundColor: "grey",padding:0,margin:0 }
                }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {
                  settings.map((setting) => (
                    
                    <MenuItem key={setting.name} sx={{padding:0, margin:"2px 0", display:'flex', justifyContent:'center', flexDirection:"column"}}>
                      <Button onClick={setting.func} style={{width:'100%',padding:"0.5rem 1rem",borderRadius:0,backgroundColor:theme.colors[0], color:theme.colors[1]}}>
                        <Typography textAlign="center">{setting.name}</Typography>
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </>
              :
              <MenuItem key={"sign-in"} component={NavLink} to={"sign-in"}>{"Log In"}</MenuItem>
            }
            
          </Box>
      </Box>
    </AppBar>
  );
}

export default NavBar;
/*import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
*/