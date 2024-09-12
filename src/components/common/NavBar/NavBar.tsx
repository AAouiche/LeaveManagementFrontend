import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/UserSlice';
import { RootState } from '../../../redux/Store';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LoginIcon from '@mui/icons-material/Login';

const drawerWidth = 240;

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    //navigate('/public/login');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          HR.LeaveManagement
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={NavLink} to="/" startIcon={<HomeIcon />}>
            Home
          </Button>
          {isLoggedIn && (
            <>
              <Button color="inherit" component={NavLink} to="/profile" startIcon={<PersonIcon />}>
                Profile
              </Button>
              <Button color="inherit" component={NavLink} to="/admin/leavetypes" startIcon={<ListAltIcon />}>
                Leave Types
              </Button>
              <Button color="inherit" component={NavLink} to="/leaverequests" startIcon={<AssignmentTurnedInIcon />}>
                Leave Requests
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                  { user?.email?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  { user?.email}
                </Typography>
                <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
                  Log Out
                </Button>
              </Box>
            </>
          )}
          {!isLoggedIn && (
            <Button color="inherit" component={NavLink} to="/login" startIcon={<LoginIcon />}>
              Log In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;