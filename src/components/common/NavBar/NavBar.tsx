import React from 'react';
import { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, ListItemButton } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/UserSlice';
import { RootState } from '../../../redux/Store';

const drawerWidth = 240;

const AppSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', icon: <HomeOutlinedIcon />, path: '/' },
    { text: 'Profile', icon: <PersonOutlinedIcon />, path: '/profile', authRequired: true },
    { text: 'Leave Types', icon: <ListAltIcon />, path: '/leavetypes', authRequired: true },
    { text: 'Leave Requests', icon: <AssignmentTurnedInIcon />, path: '/leaverequests', authRequired: true },
    { text: 'Log In', icon: <LoginIcon />, path: '/login', authRequired: false },
    { text: 'Log Out', icon: <ExitToAppIcon />, path: '/login', action: handleLogout, authRequired: true },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ m: 2 }}>
            HR.LeaveManagement
          </Typography>
          <List>
            {menuItems.map((item) => (
              (!item.authRequired || user) && (
                <ListItemButton
                  key={item.text}
                  component={item.action ? 'div' : NavLink}
                  to={item.path}
                  onClick={item.action ? item.action : undefined}
                  sx={{
                    '&.active': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )
            ))}
          </List>
        </Box>
        {user && (
          <Box sx={{ m: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Logged in as: {user.email}
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default AppSidebar;