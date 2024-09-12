import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/common/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/Store';
import { initializeApp } from './redux/slices/UserSlice';
import Loader from './components/common/Loader';
import { Box, CssBaseline, ThemeProvider, createTheme, Container } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const loading = useSelector((state: RootState) => state.user.loading);
    const location = useLocation();

    useEffect(() => {
        console.log('App initializing...');
        dispatch(initializeApp());
    }, [dispatch]);

    if (loading) {
        return <Loader />; 
    }
    if (!isLoggedIn && location.pathname !== '/public/login') {
        return <Navigate to="/public/login" />;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {isLoggedIn && <Navbar />}
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                  {loading && <Loader />}
                    <Outlet />
                </Container>
                <ToastContainer position="bottom-right" />
            </Box>
        </ThemeProvider>
    );
}

export default App;